const express = require('express');
const router = express.Router();

const examController = require('../Controllers');
const validator = require('../validator');

router.get('/', examController.getExams);

module.exports = router;
