const express = require('express');
const router = express.Router();

const questionInstanceController = require('../Controllers');
const validator = require('../validator');

router.get(
  '/',
  questionInstanceController.getQuestionsOfExamInstance
);

module.exports = router;
