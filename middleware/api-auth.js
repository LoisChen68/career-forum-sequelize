const passport = require('../config/passport')
const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ status: 'error', title: 'Unauthorized request' })
    if (user) {
      req.user = user
    }
    next()
  })(req, res, next)
}

// 驗證 Admin
const authenticatedAdmin = (req, res, next) => {
  const reqUser = req.user
  if (reqUser && reqUser.isAdmin) return next()
  return res.status(403).json({ status: 'error', title: 'Unauthorized request' })
}

// 驗證使用者審核狀態是否為 approved
const authApprovalStatus = (req, res, next) => {
  const reqUser = req.user
  if (reqUser && reqUser.approvalStatus === 'approved') return next()
  return res.status(403).json({ status: 'error', title: 'Unapproved user' })
}

module.exports = {
  authenticated,
  authenticatedAdmin,
  authApprovalStatus
}