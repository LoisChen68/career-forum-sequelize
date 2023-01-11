const { Answer } = require('../models')

const answerController = {
  // GET api/answers/:id 取得單筆回答
  getAnswer: (req, res, next) => {
    const answerId = req.params.id
    Answer.findByPk(answerId)
      .then(answer => {
        if (!answer) return res.status(404).json({
          status: 'error',
          message: 'The answer is not found.'
        })
        res.json(answer)
      })
      .catch(err => next(err))
  },
  // PUT api/answers/:id 修改回答
  putAnswer: (req, res, next) => {
    const userId = req.user.id
    const answerId = req.params.id
    const { content } = req.body
    Answer.findByPk(answerId)
      .then(answer => {
        if (!answer) return res.status(404).json({
          status: 'error',
          message: 'The answer is not found.'
        })
        if (answer.userId !== userId) return res.status(403).json({
          status: 'error',
          message: 'Permission denied.'
        })
        if (!content) return res.status(400).json({
          status: 'error',
          message: 'Content is required.'
        })
        answer.update({ content })
        return res.json({
          status: 'success',
          message: '成功修改回答',
          answer
        })
      })
      .catch(err => next(err))
  },
  // DELETE api/answers/:id 刪除回答
  deleteAnswer: (req, res, next) => {
    const userId = req.user.id
    const answerId = req.params.id
    Answer.findByPk(answerId)
      .then(answer => {
        if (!answer) return res.status(404).json({
          status: 'error',
          message: 'The answer is not found.'
        })
        if (answer.userId !== userId) return res.status(403).json({
          status: 'error',
          message: 'Permission denied.'
        })
        return answer.destroy()
      })
      .then(answer => res.json({
        status: 'success',
        message: '成功刪除回答',
        answer
      }))
      .catch(err => next(err))
  }
}

module.exports = answerController