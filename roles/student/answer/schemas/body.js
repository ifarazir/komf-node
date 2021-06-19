const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);

const submitAnswersSchema = Joi.object().keys({
  answers: Joi.array().items(
    Joi.object().keys({
      questionInstanceId: Joi.objectId().required(),
      choices: Joi.optional(),
      file: Joi.optional(),
      content: Joi.optional(),
    })
  ),
});

module.exports = {
  submitAnswersSchema,
};
