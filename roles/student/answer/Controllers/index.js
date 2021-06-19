const Response = require('../../../../response');
const ErrorTools = require('../errors');
const AnswerValidator = require('../validator/answer');

const answerValidator = new AnswerValidator();

const errors = new ErrorTools();
const { ExamInstance, Answer } = require('../../../../models');

exports.submitAnswers = async (req, res, next) => {
  try {
    // const studentId = req.user; TODO: using passport
    const studentId = '6088031301b79c441c1f40eb'; // temp

    const { body: answerInput } = req;
    const answers = answerInput.answers;

    console.log(answers);

    const existedActiveExamInstance = await ExamInstance.findOne({
      studentId,
      status: 'inProgress',
    });
    if (!existedActiveExamInstance) errors.noExamInProgress();

    const examSection = existedActiveExamInstance.section;

    let submittedAnswerCounter = 0;

    if (answers && answers.length) {
      await answerValidator.validateAnswers(
        answers,
        examSection,
        existedActiveExamInstance._id
      );

      answers.forEach(async (answer) => {
        await Answer.create(answer);
        submittedAnswerCounter += 1;
      });
    }

    return res.send(
      new Response({
        data: {
          answerInserted: submittedAnswerCounter,
          section: examSection,
        },
        message: `Answer submitted successfully`,
      })
    );
  } catch (err) {
    next(err);
  }
};
