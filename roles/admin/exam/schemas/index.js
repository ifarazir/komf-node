const Joi = require('joi');

const CreateExamSchema = Joi.object().keys({
  duration: Joi.object().keys({
    reading: Joi.number().integer().min(10).max(120).required(),
    listening: Joi.number().integer().min(10).max(120).required(),
    speaking: Joi.number().integer().min(10).max(120).required(),
    writing: Joi.number().integer().min(10).max(120).required(),
  }),
  status: Joi.string().valid('draft', 'active', 'close').required(),
  description: Joi.string().min(10).max(400).required(),
});

const EditExamSchema = Joi.object().keys({
  duration: Joi.object().keys({
    reading: Joi.number().integer().min(10).max(120),
    listening: Joi.number().integer().min(10).max(120),
    speaking: Joi.number().integer().min(10).max(120),
    writing: Joi.number().integer().min(10).max(120),
  }),
  description: Joi.string().min(10).max(400),
});

module.exports = {
  CreateExamSchema,
  EditExamSchema,
};
