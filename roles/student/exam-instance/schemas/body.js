const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);

const CreateExamInstanceSchema = Joi.object().keys({
  examId: Joi.objectId().required(),
});

module.exports = {
  CreateExamInstanceSchema,
};
