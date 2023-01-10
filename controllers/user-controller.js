const userController = {
  register: (req, res, next) => {
    res.json('register')
  },
  login: (req, res, next) => {
    res.json('login')
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