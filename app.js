const express = require('express')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})