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
    const { email, password } = req.body
    User.findOne({
      attributes: ['email', 'password', 'approvalStatus'],
      where: { email }
    })
      .then(async user => {
        if (!user) return res.status(400).json({
          type: 'Login failed',
          title: 'Incorrect email or password',
          field_errors: {
            email: 'incorrect',
            password: 'incorrect',
          }
        })
        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) return res.status(400).json({
          type: 'Login failed',
          title: 'Incorrect email or password',
          field_errors: {
            email: 'incorrect',
            password: 'incorrect',
          }
        })
        if (user.approvalStatus !== 'approved') {
          res.status(400).json({
            type: 'Login failed',
            title: 'Unapproved user',
            field_errors: {
              approvalStatus: 'must be approved',
            }
          })
        } else if (user.approvalStatus === 'approved') {
          const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '30d' })
          return res.json({ token })
        }
      })
      .catch(err => next(err))
  },
  getCurrentUser: (req, res, next) => {
    res.json('getCurrentUser')
  },
  getUser: (req, res, next) => {
    res.json('getUser')
  },
  putUser: (req, res, next) => {
    res.json('putUser')
  }
}

module.exports = userController