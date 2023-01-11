const { User } = require('../models')
const { getOffset } = require('../helpers/pagination-helper')

const adminController = {
  // GET api/admin/users 後台取得所有使用者 
  getUsers: (req, res, next) => {
    const DEFAULT_PAGE = 1
    const DEFAULT_LIMIT = 10
    const page = Number(req.query.page) || DEFAULT_PAGE
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)
    const approvalStatus = req.query.approvalStatus
    User.findAndCountAll({
      where: {
        ...approvalStatus ? { approvalStatus } : {}
      },
      attributes: { exclude: ['password'] },
      limit,
      offset
    })
      .then(usersData => {
        const count = usersData.count
        const users = usersData.rows
        res.json({ count, page, limit, users })
      })
      .catch(err => next(err))
  },
  // PATCH api/admin/users/:id 後台修改使用者審核狀態
  patchUser: (req, res, next) => {
    const userId = req.params.id
    const approvalStatus = req.body.approvalStatus
    User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    })
      .then(user => {
        if (!user) return res.status(404).json({
          status: 'error',
          message: 'The user is not found.'
        })
        user.update({
          approvalStatus
        })
        return res.json({
          status: 'success',
          message: '成功修改使用者審核狀態',
          user
        })
      })
      .catch(err => next(err))
  }
}

module.exports = adminController