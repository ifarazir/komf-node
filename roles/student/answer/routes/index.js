const express = require('express');
const router = express.Router();

const answerController = require('../Controllers');
const validator = require('../validator');

router.post('/', validator.submitAnswers, answerController.submitAnswers);

module.exports = router;
