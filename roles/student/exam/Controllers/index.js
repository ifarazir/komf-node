const Response = require('../../../../response');
const ErrorTools = require('../errors');

const errors = new ErrorTools();
const { Exam } = require('../../../../models');

exports.getExams = async (req, res, next) => {
  try {
    // TODO: Add pagination, add query string

    // Get active exams
    const exams = await Exam.find({
      isDeleted: false,
      status: 'active'
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
