const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/current_user', userController.getCurrentUser)
router.get('/:id', userController.getUser)
router.put('/:id', userController.putUser)



module.exports = router