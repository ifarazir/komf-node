const express = require('express');
const router = express.Router();

const examRoutes = require('./exam/routes');
const examInstanceRoutes = require('./exam-instance/routes');
const questionInstanceRoutes = require('./question-instance/routes');
const answerRoutes = require('./answer/routes');

router.use('/exams', examRoutes);
router.use('/exam_instances', examInstanceRoutes);
router.use('/question_instances', questionInstanceRoutes);
router.use('/answers', answerRoutes);

module.exports = router;
