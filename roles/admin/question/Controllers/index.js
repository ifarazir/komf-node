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
      if (existedParent.type !== 'body') errors.parentShouldBody();
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

exports.getQuestions = async (req, res, next) => {
  try {
    const { query } = req;

    const existedExam = await Exam.findOne({
      _id: query.examId,
      isDeleted: false,
    });
    if (!existedExam) errors.examDoesNotExist();

    const pipelines = [
      {
        $match: {
          questionParentId: null,
          section: query.section,
        },
      },
      {
        $lookup: {
          from: 'questions',
          localField: '_id',
          foreignField: 'questionParentId',
          as: 'subQuestions',
        },
      },
      {
        $unwind: {
          path: '$subQuestions',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          'subQuestions.questionNumber': 1,
        },
      },
      {
        $group: {
          _id: '$_id',
          examId: {
            $first: '$examId',
          },
          type: {
            $first: '$type',
          },
          content: {
            $first: '$content',
          },
          section: {
            $first: '$section',
          },
          part: {
            $first: '$part',
          },
          subQuestions: {
            $push: '$subQuestions',
          },
        },
      },
      {
        $sort: {
          part: 1,
        },
      },
    ];

    const examQuestions = await Question.aggregate(pipelines);

    res.send(
      new Response({
        data: {
          examQuestions,
        },
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.editQuestion = async (req, res, next) => {
  try {
    const { body: questionInput } = req;
    const { params } = req;
    const questionId = params.id;

    const existedQuestion = await Question.findById(questionId);
    if (!existedQuestion) errors.notFoundError();

    if (questionInput.type !== existedQuestion.type) errors.badRequestError();

    if (questionInput.questionParentId) {
      const existedParent = await Question.findById(
        questionInput.questionParentId
      );
      if (!existedParent) errors.parentNotExist();
      if (existedParent.type !== 'body') errors.parentShouldBody();
      if (String(existedParent._id) === String(questionId))
        errors.badRequestError();
    }

    Object.assign(existedQuestion, questionInput);

    const updatedQuestion = await existedQuestion.save();

    res.send(
      new Response({
        message: `Question edited successfully`,
        data: {
          updatedQuestion,
        },
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const { params } = req;
    const questionId = params.id;

    const affectRes = await Question.deleteMany({
      $or: [{ _id: questionId }, { questionParentId: questionId }],
    });

    res.send(
      new Response({
        message: `${affectRes.deletedCount} question(s) deleted successfully`,
      })
    );
  } catch (err) {
    next(err);
  }
};
