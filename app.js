const express = require("express")
const app = express()
const port = 3000

app.get('/start', (req, res) => {
  res.send('Hello World!');
})

app.put('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/continue', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
