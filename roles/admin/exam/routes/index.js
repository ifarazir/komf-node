const express = require('express');
const router = express.Router();

const examController = require('../Controllers');
const validator = require('../validator');

router.post('/', validator.createExam, examController.createExam);
router.get('/', examController.getExams);

router.put('/:id', validator.editExam, examController.editExam);
router.get('/:id', examController.getExam);
router.delete('/:id', examController.deleteExam);

module.exports = router;
