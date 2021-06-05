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
          section: 'reading',
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
