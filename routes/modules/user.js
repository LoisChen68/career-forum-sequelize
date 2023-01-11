const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')
const userController = require('../../controllers/user-controller')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/current_user', userController.getCurrentUser)
router.get('/:id', userController.getUser)
router.put('/:id', userController.putUser)



module.exports = router