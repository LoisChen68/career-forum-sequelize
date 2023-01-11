const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

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
  putUser: (req, res, next) => {
    res.json('putUser')
  }
}

module.exports = userController