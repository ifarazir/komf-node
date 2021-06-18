const mongoose = require('mongoose');

const ExamInstanceSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exam',
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student',
      required: true,
    },
    section: {
      type: String,
      enum: ['reading', 'listening', 'speaking', 'writing', null],
      required: true,
    },
    closedAt: {
      type: Date,
    },
    submitDeadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['inProgress', 'close'],
      default: 'inProgress',
    },
  },
  { timestamps: true }
);

const ExamInstance = mongoose.model('examInstance', ExamInstanceSchema);
module.exports = ExamInstance;
