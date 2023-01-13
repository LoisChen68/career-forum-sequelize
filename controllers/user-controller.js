const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { imgurUploadImageHandler } = require('../helpers/file-helper')

const userController = {
  register: (req, res, next) => {
    const { role, email, account, password, confirmPassword } = req.body

    if (!role || !email || !account || !password || !confirmPassword) {
      return res.status(400).json({
        type: 'Register failed',
        title: 'Missing required data',
        field_errors: {
          role: 'required',
          email: 'required',
          account: 'required',
          password: 'required',
          confirmPassword: 'required',
        },
      })
    }
    User.findOne({
      attributes: ['email'],
      where: { email }
    })
      .then(user => {
        if (!user) return bcrypt.hash(password, 10)
        if (user.email === email) {
          return res.status(400).json({
            type: 'Register failed',
            title: 'Email is used',
            field_errors: {
              email: 'used',
            }
          })
        }
      })
      .then(hash => User.create({
        role,
        email,
        account,
        password: hash,
        approvalStatus: 'reviewing',
        isAdmin: false,
        isSuspended: false,
      }))
      .then(() => res.json({ status: 'success', message: '註冊成功' }))
      .catch(err => next(err))
  },
  login: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '7d' })
      res.json({ token })
    } catch (err) {
      next(err)
    }
  },
  getCurrentUser: (req, res, next) => {
    const currentUser = req.user.id
    User.findByPk(currentUser, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })
      .then(user => res.json(user))
      .catch(err => next(err))
  },
  getUser: (req, res, next) => {
    const userId = req.params.id
    User.findByPk(userId, {
      attributes: { exclude: ['password', 'isAdmin', 'isSuspended'] }
    })
      .then(user => {
        if (!user) return res.status(404).json({
          title: "user is not found"
        })
        if (user.deletedAt) return res.status(404).json({
          title: 'user is not found',
          message: 'user is deleted'
        })
        res.json(user)
      })
      .catch(err => next(err))
  },
  putUser: async (req, res, next) => {
    try {
      const reqUser = req.user
      const { role, name, email, password, confirmPassword, account } = req.body
      const paramsId = Number(req.params.id)
      if (!role?.trim() || !email?.trim() || !account?.trim() || !password?.trim() || !confirmPassword?.trim()) return res.status(400).json({
        statusCode: '400F',
        message: 'Fields:role, email, account, password and confirmPassword are required.'
      })
      if (password !== confirmPassword) return res.status(400).json({
        statusCode: '400F',
        message: 'Fields:密碼與確認密碼不相符!'
      })
      const { files } = req
      const [user, userFoundByEmail, avatarFilePath, coverFilePath] = await Promise.all([
        User.findByPk(paramsId),
        User.findOne({ where: { email }, raw: true }),
        imgurUploadImageHandler(files?.avatar ? files.avatar[0] : null),
        imgurUploadImageHandler(files?.cover ? files.cover[0] : null)
      ])
      if (!user) return res.status(404).json({
        title: "user is not found"
      })
      if ((email === userFoundByEmail?.email) && (userFoundByEmail?.id !== reqUser.id)) return res.status(400).json({
        statusCode: '400D',
        message: 'Data:email 已重複註冊!'
      })
      const updatedUser = await user.update({
        role,
        name,
        password: bcrypt.hashSync(password, 10),
        account,
        avatar: avatarFilePath || user.avatar,
        cover: coverFilePath || user.cover
      })
      const updatedUserDataArr = [updatedUser.toJSON()].map((user) => {
        const { password, deletedAt, approvalStatus, isAdmin, isSuspended, ...showData } = updatedUser.toJSON()
        return showData
      })
      const updatedUserData = updatedUserDataArr[0] //把陣列轉換成物件
      res.json({ status: 'success', message: '成功修改個人資料', user: updatedUserData })
    } catch (error) {
      next(error)
    }
  },
  patchUserCover: async (req, res, next) => {
    try {
      const paramsId = Number(req.params.id)
      const user = await User.findByPk(paramsId)
      if (!user) return res.status(404).json({
        title: "user is not found"
      })
      const updatedUser = await user.update({
        cover: '' || user.cover
      })
      const updatedUserData = { id: updatedUser.toJSON().id, cover: updatedUser.toJSON().cover }
      res.status(200).json({
        status: "success",
        message: "成功刪除封面照",
        user: updatedUserData
      })
    } catch (error) {
      next(error)
    }
  },
  patchUserAvatar: async (req, res, next) => {
    try {
      const paramsId = Number(req.params.id)
      const user = await User.findByPk(paramsId)
      if (!user) return res.status(404).json({
        title: "user is not found"
      })
      const updatedUser = await user.update({
        avatar: '' || user.avatar
      })
      const updatedUserData = { id: updatedUser.toJSON().id, avatar: updatedUser.toJSON().avatar }
      res.status(200).json({
        status: "success",
        message: "成功刪除頭像",
        user: updatedUserData
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController