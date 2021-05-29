const express = require('express');
const router = express.Router();

const examRoutes = require('./exam/routes');
const questionRoutes = require('./question/routes');

router.use('/exams', examRoutes);
router.use('/questions', questionRoutes);

module.exports = router;
