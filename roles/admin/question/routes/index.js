const express = require('express');
const router = express.Router();

const questionController = require('../Controllers');
const validator = require('../validator');

router.post('/', validator.createQuestion, questionController.createQuestion);
router.get('/', validator.getQuestions, questionController.getQuestions);

// router.put('/:id', validator.editExam, questionController.editExam);
// router.get('/:id', questionController.getExam);
// router.delete('/:id', questionController.deleteExam);

module.exports = router;
