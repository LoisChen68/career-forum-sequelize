const { Question } = require('../models')

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
    const { title, content } = req.body
    const userId = req.user.id
    if (!content || !title) return res.status(401).json({
      title: '不得為空'
    })
    Question.create({
      title,
      content,
      userId
    })
      .then(question => res.json(question))
      .catch(err => next(err))
  },
  putQuestion: (req, res, next) => {
    res.json('putQuestion')
  },
  deleteQuestion: (req, res, next) => {
    res.json('deleteQuestion')
  }
}

module.exports = questionController