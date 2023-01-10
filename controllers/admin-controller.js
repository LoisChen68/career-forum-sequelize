const adminController = {
  getUsers: (req, res, next) => {
    res.json('getUsers')
  },
  patchUser: (req, res, next) => {
    res.json('patchUser')
  }
}

module.exports = adminController