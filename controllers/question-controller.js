const questionController = {
  getQuestions: (req, res, next) => {
    res.json('getQuestions')
  },
  getQuestion: (req, res, next) => {
    res.json('getQuestion')
  },
  getAnswers: (req, res, next) => {
    res.json('getAnswers')
  },
  postQuestion: (req, res, next) => {
    res.json('postQuestion')
  },
  putQuestion: (req, res, next) => {
    res.json('putQuestion')
  },
  deleteQuestion: (req, res, next) => {
    res.json('deleteQuestion')
  }
}

module.exports = questionController