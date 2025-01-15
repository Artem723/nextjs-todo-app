import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const PORT = 80

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users/register', (req, res) => {


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