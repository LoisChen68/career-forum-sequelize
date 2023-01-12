const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// set up Passport strategy
passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  // authenticate user
  (email, password, cb) => {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          const error = new Error('Incorrect email or password')
          error.statusCode = 401
          cb(error)
          return
        }
        if (user.approvalStatus !== 'approved') {
          const error = new Error('Unapproved user')
          error.statusCode = 403
          cb(error)
          return
        }
        bcrypt.compare(password, user.password).then(res => {
          if (!res) {
            const error = new Error('Incorrect email or password')
            error.statusCode = 401
            cb(error)
          }
          return cb(null, user)
        })
      })
  }
))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
  User.findByPk(jwtPayload.id, {
  })
    .then(user => cb(null, user))
    .catch(err => cb(err))
}))

// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id).then(user => {
    return cb(null, user)
  })
})

module.exports = passport
