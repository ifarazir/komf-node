const mongoose = require('mongoose');

const QuestionInstanceSchema = new mongoose.Schema(
  {
    examInstanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exam',
      required: true,
    },
    questionParentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exam',
    },
    content: {
      type: String,
      maxLength: 10000000000,
      required: true,
    },
    questionNumber: {
      type: Number,
      min: 1,
      max: 100,
    },
    file: {
      type: String,
      maxLength: 1000,
    },
    section: {
      type: String,
      enum: ['speaking', 'writing', 'reading', 'listening', null],
    },
    type: {
      type: String,
      enum: ['body', 'singleChoice', 'multiChoice', 'ordering'], // TODO: Change it later
    },
    part: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
    options: {
      A: {
        type: String,
        maxLength: 1000,
      },
      B: {
        type: String,
        maxLength: 1000,
      },
      C: {
        type: String,
        maxLength: 1000,
      },
      D: {
        type: String,
        maxLength: 1000,
      },
      E: {
        type: String,
        maxLength: 1000,
      },
    },
    answer: [
      {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E'],
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model('questionInstance', QuestionInstanceSchema);
module.exports = Question;
