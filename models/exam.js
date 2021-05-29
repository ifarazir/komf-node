const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema(
  {
    duration: {
      reading: {
        type: Number,
        min: 10,
        max: 120,
        required: true,
      },
      listening: {
        type: Number,
        min: 10,
        max: 120,
        required: true,
      },
      speaking: {
        type: Number,
        min: 10,
        max: 120,
        required: true,
      },
      writing: {
        max: 120,
        type: Number,
        min: 10,
        required: true,
      },
    },
    description: {
      type: String,
      maxLength: 400,
      minLength: 3,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Exam = mongoose.model('exam', ExamSchema);
module.exports = Exam;
