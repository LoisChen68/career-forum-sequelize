const express = require('express')
const router = express.Router()
const users = require('./modules/user')
const admin = require('./modules/admin')
const question = require('./modules/question')
const answer = require('./modules/answer')
const userController = require('../controllers/user-controller')
const passport = require('../config/passport')

const { authenticated, authenticatedAdmin, authApprovalStatus } = require('../middleware/api-auth')
const { apiErrorHandler } = require('../middleware/error-handle')

router.post('/users/login', passport.authenticate('local', { session: false }), userController.login)
router.post('/users/register', userController.register)

router.use('/users', authenticated, authApprovalStatus, users)
router.use('/admin', authenticated, authenticatedAdmin, admin)
router.use('/questions', authenticated, question)
router.use('/answers', authenticated, answer)
router.use('/', apiErrorHandler)

module.exports = router