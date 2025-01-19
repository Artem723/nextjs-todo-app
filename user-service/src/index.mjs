import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import User from './db/Models/UserModel.mjs'
import { checkToken } from './middlewares.mjs'

const app = express()
const PORT = 80

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users/register', async (req, res) => {
  const body = req.body;
  const user = new User();
  if (!(await user.findByLogin(body.login))) {
    res.status(400).end(`Error: user ${body.login} already exists.`)
    return;
  } 
  user.name = body.name;
  user.login = body.login;
  user.email = body.email;
  user.lastLoginDate = Date.now();
  user.setPassword(body.password);
  await user.save();
})

app.get('/users/login', (req, res) => {
  console.log("Login request received");
  const login = req.body.login;
  const password = req.body.password;
  const user = User.findByLogin(login);
  if (!user) {
    res.status(400).end(`Error: user ${login} not found.`)
  } else if (!user.checkPWD(password)) {
    res.status(400).end(`Error: password is incorrect.`)
  } else {
    res.cookie('token', user.generateToken(), { httpOnly: true })
    res.end('OK.');
    // update user's last login
    user.lastLoginDate = Date.now();
    user.save().catch((err) => {
      console.log('Error adjusting the \'lastLoginDate\' of the user: ', err)
    });
  }
})

app.get('/users/me', checkToken, (req, res) => {
  const user = req.locals.user;
  const responseUser = {
    login: user.login,
    name: user.name,
    email: user.email,
    creationDate: user.creationDate
  }
  res.end({ user: user.stringify() });
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
