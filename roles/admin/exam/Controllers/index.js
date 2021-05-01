const Response = require('../../../../response');
const Error = require('../errors');

const errors = new Error();
const { Exam, QuestionGroup } = require('../../../../models');

exports.createExam = async (req, res, next) => {
  try {
    const { body: examInput } = req;
    const createdExam = await Exam.create(examInput);

    /**
     * Create question groups for a exam.
     */
    const questionGrouptypes = ['reading', 'writing', 'speaking', 'listening'];
    const questionGroups = [];
    for (let index = 0; index < questionGrouptypes.length; index++) {
      const questionGroup = await QuestionGroup.create({
        examId: createdExam.id,
        type: questionGrouptypes[index],
      });
      questionGroups.push(questionGroup.dataValues);
    }

    res.send(
      new Response({
        data: {
          createdExam,
          questionGroups,
        },
        message: `Exam and it's question groups created successfully`,
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.editExam = async (req, res, next) => {
  try {
    const { body: examInput } = req;
    const { id: examId } = req.params;

    const exam = await Exam.findOne({
      where: { id: examId, is_deleted: false },
    });
    if (!exam) errors.notFoundError();

    await Exam.update(examInput, {
      where: { id: examId, is_deleted: false },
    });

    res.send(
      new Response({
        message: 'Exam updated successfully',
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.getExam = async (req, res, next) => {
  try {
    const { id: examId } = req.params;

    const exam = await Exam.findOne({
      where: { id: examId, is_deleted: false },
    });
    if (!exam) errors.notFoundError();

    res.send(
      new Response({
        data: { exam },
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.getExams = async (req, res, next) => {
  try {
    // TODO: Add pagination, add query string
    const exams = await Exam.findAll({
      where: {
        is_deleted: false,
      },
    });

    res.send(
      new Response({
        data: { exams },
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.deleteExam = async (req, res, next) => {
  try {
    const { id: examId } = req.params;

    const exam = await Exam.findOne({
      where: { id: examId, is_deleted: false },
    });
    if (!exam) errors.notFoundError();

    await Exam.update(
      { is_deleted: true },
      {
        where: { id: examId, is_deleted: false },
      }
    );

    res.send(
      new Response({
        message: 'Exam deleted successfully',
      })
    );
  } catch (err) {
    next(err);
  }
};
