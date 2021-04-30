const Response = require('../../../../response');
const ErrorTools = require('../errors');

const errors = new ErrorTools();
const { Exam } = require('../../../../models');

exports.createExam = async (req, res, next) => {
  try {
    const { body: examInput } = req;
    const createdExam = await Exam.create(examInput);
    res.send(
      new Response({
        data: { createdExam },
        message: 'Exam created successfully',
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
