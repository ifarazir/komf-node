const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    questionInstanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'questionInstance',
      required: true,
    },
    choices: [
      {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E'],
      },
    ],
    file: {
      type: String,
    },
    content: {
      type: String,
    },
    score: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Exam = mongoose.model('answer', answerSchema);
module.exports = Exam;
