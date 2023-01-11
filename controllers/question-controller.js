const { getOffset } = require('../helpers/pagination-helper')
const { Question, Answer } = require('../models')

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
    if (!content || !title) return res.status(400).json({
      title: 'title and content is required',
    })
    Question.create({
      title,
      content,
      userId
    })
      .then(question => res.json({
        status: 'success',
        message: "成功新增問題",
        question
      }))
      .catch(err => next(err))
  },
  postAnswer: (req, res, next) => {
    const { content } = req.body
    const userId = req.user.id
    const questionId = Number(req.params.id)
    Question.findByPk(questionId)
      .then(question => {
        if (!question) return res.status(404).json({
          title: 'question not found'
        })
      })
    if (!content) return res.status(400).json({
      title: 'content is required'
    })
    Answer.create({
      content,
      userId,
      questionId
    })
      .then(answer => res.json({
        status: 'success',
        message: "成功新增回答",
        answer,
      }))
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