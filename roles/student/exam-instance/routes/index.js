const express = require('express');
const router = express.Router();

const examInstanceController = require('../Controllers');
const validator = require('../validator');

router.post(
  '/',
  validator.createExamInstance,
  examInstanceController.createExamInstance
);

module.exports = router;
