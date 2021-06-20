const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin');
const studentRoutes = require('./student');

router.use('/admin', adminRoutes);
router.use('/student', studentRoutes);

module.exports = router;
