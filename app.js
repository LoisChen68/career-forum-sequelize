const express = require('express')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})