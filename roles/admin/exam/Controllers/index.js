const Response = require('../../../../response');
const { Exam } = require('../../../../models');

exports.createExam = async (req, res) => {
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
