const { getOffset } = require('../helpers/pagination-helper')
const { Question, User, Answer } = require('../models')

const questionController = {
  // GET api/questions 取得所有問題且附帶一筆最新回答
  getQuestions: (req, res, next) => {
    const DEFAULT_PAGE = 1
    const DEFAULT_LIMIT = 10
    const page = Number(req.query.page) || DEFAULT_PAGE
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)
    Question.findAndCountAll({
      include: [{
        model: User,
        attributes: ['id', 'role', 'account', 'avatar']
      },
      {
        model: Answer,
        limit: 1,
        order: [['createdAt', 'DESC']],
        include: {
          model: User,
          attributes: ['id', 'role', 'account', 'avatar']
        }
      }
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    })
      .then(questionsData => {
        const count = questionsData.count
        const questions = questionsData.rows
        res.json({ count, page, limit, questions })
      })
      .catch(err => next(err))
  },
  // GET api/question/:id 取得一筆問題
  getQuestion: (req, res, next) => {
    const questionId = Number(req.params.id)
    Promise.all([
      Question.findByPk(questionId, {
        include: [{ model: User, attributes: ['id', 'role', 'account', 'avatar'] }]
      }),
      Answer.findAndCountAll({ where: { questionId } })
    ])
      .then(([question, answer]) => {
        if (!question) res.status(404).json({
          status: 'error',
          message: 'question is not found'
        })
        const { ...data } = question.toJSON()
        data.answerCount = answer.count
        res.json(data)
      })
      .catch(err => next(err))
  },
  // GET api/questions/:id/answers 取得問題底下所有回答
  getAnswers: (req, res, next) => {
    const DEFAULT_PAGE = 1
    const DEFAULT_LIMIT = 10
    const page = Number(req.query.page) || DEFAULT_PAGE
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)
    const questionId = Number(req.params.id)
    Answer.findAndCountAll({
      where: { questionId },
      include: [{ model: User, attributes: ['id', 'role', 'account', 'avatar'] }],
      limit,
      offset
    })
      .then(answersData => {
        const count = answersData.count
        const answers = answersData.rows
        res.json({
          count,
          page,
          limit,
          answers
        })
      })
      .catch(err => next(err))
  },
  // POST api/questions 新增問題
  postQuestion: (req, res, next) => {
    const { title, content } = req.body
    const userId = req.user.id
    if (!content || !title) return res.status(400).json({
      status: 'error',
      message: 'title and content is required',
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
  // POST api/questions/:id/answers 新增問題底下的回答
  postAnswer: (req, res, next) => {
    const { content } = req.body
    const userId = req.user.id
    const questionId = Number(req.params.id)
    Question.findByPk(questionId)
      .then(question => {
        if (!question) return res.status(404).json({
          status: 'error',
          message: 'question is not found'
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