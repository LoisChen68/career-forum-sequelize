const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ status: 'error', message: '尚未登入' })
    if (user) {
      req.user = user
    }
    next()
  })(req, res, next)
}

module.exports = {
  authenticated
}