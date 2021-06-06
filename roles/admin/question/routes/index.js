const express = require('express');
const router = express.Router();

const questionController = require('../Controllers');
const validator = require('../validator');

router.post('/', validator.createQuestion, questionController.createQuestion);
router.get('/', validator.getQuestions, questionController.getQuestions);

router.put('/:id', validator.editQuestion, questionController.editQuestion);

router.delete(
  '/:id',
  validator.deleteQuestion,
  questionController.deleteQuestion
);

module.exports = router;
