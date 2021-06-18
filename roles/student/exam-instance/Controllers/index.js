const Response = require('../../../../response');
const ErrorTools = require('../errors');
const agenda = require('../../../../jobs');

const errors = new ErrorTools();
const {
  Exam,
  ExamInstance,
  Question,
  QuestionInstance,
} = require('../../../../models');

exports.createExamInstance = async (req, res, next) => {
  try {
    // const studentId = req.user; TODO: using passport
    const studentId = '6088031301b79c441c1f40eb'; // temp
    const { body: examInstanceInput } = req;

    const existedActiveExamInstance = await ExamInstance.findOne({
      studentId,
      status: 'inProgress',
    });
    if (existedActiveExamInstance) errors.anotherExamInProgress();

    const referenceExam = await Exam.findOne({
      _id: examInstanceInput.examId,
      status: 'active',
      isDeleted: false,
    });
    if (!referenceExam) errors.referenceExamNotFound();

    const currentTimeMS = Date.now();
    const readingDurationMS = referenceExam.duration.reading * 60 * 1000;
    const readingDeadLine = new Date(currentTimeMS + readingDurationMS);

    const examInstance = {
      studentId,
      examId: referenceExam._id,
      section: 'reading',
      status: 'inProgress',
      submitDeadline: readingDeadLine,
      duration: referenceExam.duration,
    };

    const createdExam = await ExamInstance.create(examInstance);

    const gettingQuestionPipelines = [
      {
        $match: {
          questionParentId: null,
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

    agenda.schedule(readingDeadLine, 'handle-exam-timeout', {
      examInstanceId: createdExam._id,
      section: createdExam.section,
    });

    // Create question instances
    const examQuestions = await Question.aggregate(gettingQuestionPipelines);
    examQuestions.forEach(async (bodyQuestion) => {
      const subQuestions = bodyQuestion.subQuestions;
      const unnecessaryKeys = [
        '_id',
        'createdAt',
        'updatedAt',
        '__v',
        'examId',
        'subQuestions',
      ];
      unnecessaryKeys.forEach((unnecessaryKey) => {
        delete bodyQuestion[unnecessaryKey];
      });

      bodyQuestion.examInstanceId = createdExam._id;

      const createdBodyInstance = await QuestionInstance.create(bodyQuestion);

      subQuestions.forEach(async (subQuestion) => {
        const unnecessaryKeys = [
          '_id',
          'createdAt',
          'updatedAt',
          '__v',
          'examId',
        ];
        unnecessaryKeys.forEach((unnecessaryKey) => {
          delete subQuestion[unnecessaryKey];
        });
        subQuestion.questionParentId = createdBodyInstance._id;
        subQuestion.examInstanceId = createdExam._id;
        await QuestionInstance.create(subQuestion);
      });
    });

    res.send(
      new Response({
        message: 'Exam started successfully',
      })
    );
  } catch (err) {
    next(err);
  }
};
