const express = require('express');
const router = express.Router();

const examController = require('../Controllers');
const validator = require('../validator');

router.post('/', validator.createExam, examController.createExam);

module.exports = router;
