const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/welcome', (req, res) => {
  res.send(JSON.stringify({message: 'hello world'}));
})

app.listen(port, () => {
  console.log(`server.open listening at http://localhost:${port}`)
})