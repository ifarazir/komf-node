const Response = require('../../../../response');
const ErrorTools = require('../errors');
const AnswerValidator = require('../validator/answer');

const agenda = require('../../../../jobs');

const answerValidator = new AnswerValidator();

const errors = new ErrorTools();
const { ExamInstance, Answer } = require('../../../../models');

exports.submitAnswers = async (req, res, next) => {
  try {
    // const studentId = req.user; TODO: using passport
    const studentId = '6088031301b79c441c1f40eb'; // temp

    const { body: answerInput } = req;
    const answers = answerInput.answers;

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

      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        await Answer.create(answer);
        submittedAnswerCounter += 1;
      }
    }

    const currentTimeMS = Date.now();

    switch (examSection) {
      case 'reading':
        const listeningDurationMS =
          existedActiveExamInstance.duration.listening * 60 * 1000;
        const listeningDeadLine = new Date(currentTimeMS + listeningDurationMS);
        agenda.schedule(listeningDeadLine, 'handle-exam-timeout', {
          examInstanceId: existedActiveExamInstance._id,
          section: 'listening',
        });
        existedActiveExamInstance.section = 'listening';
        await existedActiveExamInstance.save();
        break;

      case 'listening':
        const speakingDurationMS =
          existedActiveExamInstance.duration.speaking * 60 * 1000;
        const speakingDeadLine = new Date(currentTimeMS + speakingDurationMS);

        agenda.schedule(speakingDeadLine, 'handle-exam-timeout', {
          examInstanceId: existedActiveExamInstance._id,
          section: 'speaking',
        });

        existedActiveExamInstance.section = 'speaking';
        await existedActiveExamInstance.save();
        break;

      case 'speaking':
        const writingDurationMS =
          existedActiveExamInstance.duration.writing * 60 * 1000;
        const writingDeadLine = new Date(currentTimeMS + writingDurationMS);
        agenda.schedule(writingDeadLine, 'handle-exam-timeout', {
          examInstanceId: existedActiveExamInstance._id,
          section: 'writing',
        });

        existedActiveExamInstance.section = 'writing';
        await existedActiveExamInstance.save();
        break;

      case 'writing':
        existedActiveExamInstance.status = 'finished';
        existedActiveExamInstance.section = null;
        existedActiveExamInstance.save();
        await ExamInstance.findOneAndUpdate(
          {
            _id: existedActiveExamInstance._id,
          },
          { finishedAt: Date.now(), status: 'finished', section: null }
        );
        break;
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
