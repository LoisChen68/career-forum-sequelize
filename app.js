require('dotenv').config()
const express = require('express')
const passport = require('./config/passport')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})