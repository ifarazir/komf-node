const { ExamInstance } = require('../models');

module.exports = (agenda) => {
  agenda.define('handle-exam-timeout', async (job) => {
    const { examInstanceId, section } = job.attrs.data;

    const exam = await ExamInstance.findOne({
      _id: examInstanceId,
      status: 'inProgress',
    });

    const currentSection = exam.section;

    if (!exam || currentSection !== section) return;

    const currentTimeMS = Date.now();

    switch (currentSection) {
      case 'reading':
        const listeningDurationMS = exam.duration.listening * 60 * 1000;
        const listeningDeadLine = new Date(currentTimeMS + listeningDurationMS);
        exam.submitDeadline = listeningDeadLine;
        exam.section = 'listening';
        agenda.schedule(listeningDeadLine, 'handle-exam-timeout', {
          examInstanceId: examInstanceId,
          section: exam.section,
        });

        await exam.save();
        break;
      case 'listening':
        const speakingDurationMS = exam.duration.speaking * 60 * 1000;
        const speakingDeadLine = new Date(currentTimeMS + speakingDurationMS);
        exam.submitDeadline = speakingDeadLine;
        exam.section = 'speaking';
        agenda.schedule(speakingDeadLine, 'handle-exam-timeout', {
          examInstanceId: examInstanceId,
          section: exam.section,
        });
        await exam.save();
        break;

      case 'speaking':
        const writingDurationMS = exam.duration.writing * 60 * 1000;
        const writingDeadLine = new Date(currentTimeMS + writingDurationMS);
        exam.submitDeadline = writingDeadLine;
        exam.section = 'writing';
        agenda.schedule(writingDeadLine, 'handle-exam-timeout', {
          examInstanceId: examInstanceId,
          section: exam.section,
        });
        await exam.save();
        break;
      case 'writing':
        exam.finishedAt = new Date();
        exam.status = 'finished';
        exam.section = null;
        await exam.save();
        break;
    }

    // TODO: Remove it
    console.log('Exam section changed');
  });
};
