const { getOffset } = require('../helpers/pagination-helper')
const { Question } = require('../models')

const questionController = {
  getQuestions: (req, res, next) => {
    const DEFAULT_PAGE = 1
    const DEFAULT_LIMIT = 10
    const page = Number(req.query.page) || DEFAULT_PAGE
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)
    Question.findAndCountAll({ limit, offset })
      .then(questionsData => {
        const count = questionsData.count
        const questions = questionsData.rows
        res.json({ count, limit, page, questions })
      })
      .catch(err => next(err))
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