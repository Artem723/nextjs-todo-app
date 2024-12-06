import express from 'express'
const app = express()
const PORT = 80

app.post('/users/add', (req, res) => {
  throw new Error("Not implemented")
  
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