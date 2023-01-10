const express = require('express')
const router = express.Router()
const questionController = require('../../controllers/question-controller')

router.get('/', questionController.getQuestions)
router.get('/:id', questionController.getQuestion)
router.get('/:id/answers', questionController.getAnswers)
router.post('/', questionController.postQuestion)
router.put('/:id', questionController.putQuestion)
router.delete('/:id', questionController.deleteQuestion)

module.exports = router