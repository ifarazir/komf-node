const express = require('express');
const router = express.Router();

const examRoutes = require('./exam/routes');

router.use('/exams', examRoutes);

module.exports = router;
