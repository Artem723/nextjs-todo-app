import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import User from './db/Models/UserModel.mjs'
import checkToken from './middlewares/checkToken.mjs'
import requestLogger from './middlewares/requestLogger.mjs'
import mongoose from './db/connection.mjs'
import logger from './logger/index.mjs'
import validationMessageFlatter from './utils/validationMessageFlatter.mjs'

export const app = express();
const PORT = 80;

app.use(bodyParser.json());
app.use(cookieParser());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.post('/users/register', async (req, res) => {
  const body = req.body;
  if (await User.findByLogin(body.login)) {
    res.status(400).end(`Error: user ${body.login} already exists.`)
    return;
  }
  const user = new User();

  user.name = body.name;
  user.login = body.login;
  user.email = body.email;
  user.lastLoginDate = Date.now();
  try {
    await user.setPassword(body.password);
    await user.save();
    res.cookie('token', await user.generateToken(), { httpOnly: true })
    res.end('OK.');
  } catch (e) {
    if (e.errors) {
      res.status(400).end(`Validation error: ${JSON.stringify(validationMessageFlatter(e.errors))}`);
      return;
    }
    logger.error('Not possible to register a user. Internal error.')
    logger.error(e);
    res.status(500).end('Internal server error.');
  }
})

app.post('/users/login', async (req, res) => {
  console.log("Login request received");
  const login = req.body.login;
  const password = req.body.password;
  const user = await User.findByLogin(login);
  if (!user) {
    res.status(400).end(`Error: user ${login} not found.`)
  } else if (!(await user.checkPWD(password))) {
    res.status(400).end(`Error: password is incorrect.`)
  } else {
    res.cookie('token', await user.generateToken(), { httpOnly: true })
    res.end('OK.');
    // update user's last login
    user.lastLoginDate = Date.now();
    user.save().catch((err) => {
      console.log('Error adjusting the \'lastLoginDate\' of the user: ', err)
    });
  }
})

app.get('/users/me', checkToken, (req, res) => {
  const user = res.locals.user;
  res.end(JSON.stringify({ user: user.stringify() }));
})

app.post('/users/isAuthorized', checkToken, (req, res) => {
  if (res.locals.user) res.end('OK.');
  else res.status(401).end('Unauthorized');
})

app.get('/users/:id', (res, req) => {
  throw new Error("Not implemented")
})

app.listen(PORT, () => {
  console.log(`Service has been started. Listening on port ${PORT}`)
})
