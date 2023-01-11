const express = require('express')
const router = express.Router()
const users = require('./modules/user')
const admin = require('./modules/admin')
const question = require('./modules/question')
const answer = require('./modules/answer')

const { apiErrorHandler } = require('../middleware/error-handle')

router.use('/users', users)
router.use('/admin', admin)
router.use('/questions', question)
router.use('/answers', answer)
router.use('/', apiErrorHandler)

module.exports = router