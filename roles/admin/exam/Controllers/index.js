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
        message: `Exam created successfully`,
        data: {
          createdExam,
        },
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

    const exam = await Exam.findOne({ _id: examId, isDeleted: false });
    if (!exam) errors.notFoundError();

    Object.assign(exam, examInput);
    await exam.save();

    res.send(
      new Response({
        message: 'Exam updated successfully',
        data: {
          updatedExam: exam,
        },
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.getExam = async (req, res, next) => {
  try {
    const { id: examId } = req.params;

    const exam = await Exam.findOne({ _id: examId, isDeleted: false });
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
    const exams = await Exam.find({
      isDeleted: false,
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
      _id: examId,
      isDeleted: false,
    });
    if (!exam) errors.notFoundError();

    exam.isDeleted = true;
    await exam.save();

    res.send(
      new Response({
        message: 'Exam deleted successfully',
      })
    );
  } catch (err) {
    next(err);
  }
};
