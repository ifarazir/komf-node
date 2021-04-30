const Joi = require('joi');

const ExamSchema = Joi.object().keys({
  duration: Joi.number().integer().min(10).max(400).required(),
  description: Joi.string().min(10).max(400).required(),
});

module.exports = {
  ExamSchema,
};
