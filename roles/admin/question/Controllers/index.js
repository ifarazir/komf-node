const Response = require('../../../../response');
const ErrorTools = require('../errors');

const errors = new ErrorTools();
const { Question, Exam } = require('../../../../models');

exports.createQuestion = async (req, res, next) => {
  try {
    const { body: questionInput } = req;
    const existedExam = await Exam.findOne({
      _id: questionInput.examId,
      isDeleted: false,
    });
    if (!existedExam) errors.examDoesNotExist();
    // const createdExam = await Exam.create(questionInput);

    if (questionInput.questionParentId) {
      const existedParent = await Question.findById(
        questionInput.questionParentId
      );
      if (!existedParent) errors.parentNotExist();
    }

    const createdQuesiton = await Question.create(questionInput);

    res.send(
      new Response({
        message: `Question created successfully`,
        data: {
          createdQuesiton,
        },
      })
    );
  } catch (err) {
    next(err);
  }
};
