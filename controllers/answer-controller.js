const answerController = {
  getAnswers: (req, res, next) => {
    res.json('getAnswers')
  },
  getAnswer: (req, res, next) => {
    res.json('getAnswer')
  },
  postAnswer: (req, res, next) => {
    res.json('postAnswer')
  },
  putAnswer: (req, res, next) => {
    res.json('putAnswer')
  },
  deleteAnswer: (req, res, next) => {
    res.json('deleteAnswer')
  }
}

module.exports = answerController