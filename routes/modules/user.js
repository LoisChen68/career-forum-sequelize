const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')
const upload = require('../../middleware/multer')
const { authCurrentUser } = require('../../middleware/api-auth')

router.get('/current_user', userController.getCurrentUser)
router.patch('/:id/cover', authCurrentUser, upload.fields({ name: 'cover', maxCount: 1 }), userController.patchUserCover)
router.patch('/:id/avatar', authCurrentUser, upload.fields({ name: 'avatar', maxCount: 1 }), userController.patchUserAvatar)
router.put('/:id', authCurrentUser, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), userController.putUser)
router.get('/:id', userController.getUser)



module.exports = router