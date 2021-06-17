const express = require('express');
const router = express.Router();

const examRoutes = require('./exam/routes');
const examInstanceRoutes = require('./exam-instance/routes');

router.use('/exams', examRoutes);
router.use('/exam_instances', examInstanceRoutes);

module.exports = router;
