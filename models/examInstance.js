const mongoose = require('mongoose');

const ExamInstanceSchema = new mongoose.Schema(
  {
    duration: {
      reading: {
        type: Number,
        // min: 10,
        max: 120,
        required: true,
      },
      listening: {
        type: Number,
        // min: 10,
        max: 120,
        required: true,
      },
      speaking: {
        type: Number,
        // min: 10,
        max: 120,
        required: true,
      },
      writing: {
        max: 120,
        type: Number,
        // min: 10,
        required: true,
      },
    },
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
    finishedAt: {
      type: Date,
    },
    submitDeadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['inProgress', 'finished'],
      default: 'inProgress',
    },
  },
  { timestamps: true }
);

const ExamInstance = mongoose.model('examInstance', ExamInstanceSchema);
module.exports = ExamInstance;
