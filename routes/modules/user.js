const express = require('express')
const router = express.Router()
const { authCurrentUser } = require('../../middleware/api-auth')
const userController = require('../../controllers/user-controller')

router.get('/current_user', userController.getCurrentUser)
router.patch('/:id/cover', authCurrentUser, userController.patchUserCover)
router.patch('/:id/avatar', authCurrentUser, userController.patchUserAvatar)
router.put('/:id', authCurrentUser, userController.putUser)
router.get('/:id', userController.getUser)



module.exports = router