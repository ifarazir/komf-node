const Response = require('../../../../response');
const ErrorTools = require('../errors');

const errors = new ErrorTools();
const {
  Exam,
  ExamInstance,
  Question,
  QuestionInstance,
} = require('../../../../models');

exports.getQuestionsOfExamInstance = async (req, res, next) => {
  try {
    // const studentId = req.user; TODO: using passport
    const studentId = '6088031301b79c441c1f40eb'; // temp

    const existedActiveExamInstance = await ExamInstance.findOne({
      studentId,
      status: 'inProgress',
    });
    if (!existedActiveExamInstance) errors.noExamInProgress();

    const examSection = existedActiveExamInstance.section;
    const examsubmitDeadline = existedActiveExamInstance.submitDeadline;

    const gettingQuestionPipelines = [
      {
        $match: {
          examInstanceId: existedActiveExamInstance._id,
          questionParentId: null,
          section: examSection,
        },
      },
      {
        $lookup: {
          from: 'questioninstances',
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
          examInstanceId: {
            $first: '$examInstanceId',
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
      {
        $project: {
          _id: 1,
          examInstanceId: 1,
          type: 1,
          content: 1,
          section: 1,
          part: 1,
          subQuestions: {
            _id: 1,
            questionParentId: 1,
            type: 1,
            content: 1,
            questionNumber: 1,
            section: 1,
            part: 1,
            options: 1,
            examInstanceId: 1,
          },
        },
      },
    ];

    const examQuestions = await QuestionInstance.aggregate(
      gettingQuestionPipelines
    );

    res.send(
      new Response({
        data: {
          questions: examQuestions,
          section: examSection,
          submitDeadline: examsubmitDeadline,
        },
      })
    );
  } catch (err) {
    next(err);
  }
};
