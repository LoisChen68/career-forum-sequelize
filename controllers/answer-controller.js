const { Answer } = require('../models')

const answerController = {
  getAnswers: (req, res, next) => {
    res.json('getAnswers')
  },
  getAnswer: (req, res, next) => {
    res.json('getAnswer')
  },
  putAnswer: (req, res, next) => {
    res.json('putAnswer')
  },
  deleteAnswer: (req, res, next) => {
    res.json('deleteAnswer')
  }
}

module.exports = answerController