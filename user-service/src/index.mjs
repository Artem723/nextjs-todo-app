import express from 'express'
import bodyParser from 'body-parser'
import User from './db/Models/UserModel.mjs'
const app = express()
const PORT = 80

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users/register', async (req, res) => {
  const body = req.body;
  const user = new User();
  user.name = body.name;
  if (!(await user.findByLogin(body.login))) {
    res.status(400).end(`Error: user ${body.login} already exists.`)
  } 
  user.login = body.login;
  user.email = body.email;
  user.setPassword(body.password);
  await user.save();
})

app.get('/users/getToken', (req, res) => {
  throw new Error("Not implemented")
})

app.post('/users/checkToken', (req, res) => {
  throw new Error("Not implemented")
})

app.get('/users/:id', (res, req) => {
  throw new Error("Not implemented")
})

app.listen(PORT, () => {
  console.log(`Service has been started. Listening on port ${PORT}`)
})