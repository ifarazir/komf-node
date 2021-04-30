const express = require('express');
const router = express.Router();

const examController = require('../Controllers');
const validator = require('../validator');

router.post('/', validator.createExam, examController.createExam);
router.put('/:id', validator.editExam, examController.editExam);

module.exports = router;
