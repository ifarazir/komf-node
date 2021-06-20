const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// const GetQuestionsSchema = Joi.object().keys({
//   examId: Joi.objectId().required(),
//   section: Joi.string()
//     .valid('reading', 'listening', 'speaking', 'writing')
//     .required(),
// });

module.exports = {
  // GetQuestionsSchema,
};
