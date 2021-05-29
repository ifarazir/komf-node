const Joi = require('joi');

const CreateQuestionSchema = Joi.object().keys({
  examId: Joi.string().max(30).required(),
  questionParentId: Joi.string().max(30), // TODO: Conditional validation
  content: Joi.string().min(10).max(10000000000).required(),
  questionNumber: Joi.number().integer().required().min(1).max(100), // TODO: Conditional validation base on body or not
  file: Joi.string().max(1000), // TODO: Conditional validation base on section and type combination
  section: Joi.string()
    .valid('reading', 'listening', 'speaking', 'writing')
    .required(),
  type: Joi.string() // TODO: Avoid using 'singleChoice', 'multiChoice', 'ordering' when section is 'speaking' or 'writing'
    .valid('body', 'singleChoice', 'multiChoice', 'ordering')
    .required(),
  part: Joi.alternatives()
    .conditional('type', [
      {
        is: 'body',
        then: Joi.number().integer().valid(1, 2, 3, 4).required(),
      },
      {
        is: 'singleChoice',
        then: Joi.string().allow(null),
      },
      {
        is: 'multiChoice',
        then: Joi.string().allow(null),
      },
      {
        is: 'ordering',
        then: Joi.string().allow(null),
      },
    ])
    .required(),
  options: Joi.alternatives()
    .conditional('type', [
      {
        is: 'singleChoice',
        then: Joi.object()
          .keys({
            A: Joi.string().max(1000).required(),
            B: Joi.string().max(1000).required(),
            C: Joi.string().max(1000).required(),
            D: Joi.string().max(1000).required(),
          })
          .required(),
      },
      {
        is: 'multiChoice',
        then: Joi.object()
          .keys({
            A: Joi.string().max(1000).required(),
            B: Joi.string().max(1000).required(),
            C: Joi.string().max(1000).required(),
            D: Joi.string().max(1000).required(),
            E: Joi.string().max(1000).required(),
          })
          .required(),
      },
      {
        is: 'ordering',
        then: Joi.object()
          .keys({
            A: Joi.string().max(1000).required(),
            B: Joi.string().max(1000).required(),
            C: Joi.string().max(1000).required(),
            D: Joi.string().max(1000).required(),
            E: Joi.string().max(1000).required(),
          })
          .required(),
      },
      {
        is: 'body',
        then: Joi.string().allow(null),
      },
    ])
    .required(),
  answer: Joi.alternatives()
    .conditional('type', [
      {
        is: 'singleChoice',
        then: Joi.array()
          .items(Joi.string().valid('A', 'B', 'C', 'D'))
          .min(1)
          .max(1),
      },
      {
        is: 'multiChoice',
        then: Joi.array()
          .items(Joi.string().valid('A', 'B', 'C', 'D', 'E'))
          .min(2)
          .max(5),
      },
      {
        is: 'ordering',
        then: Joi.array()
          .items(Joi.string().valid('A', 'B', 'C', 'D', 'E'))
          .min(2)
          .max(5),
      },
      {
        is: 'body',
        then: Joi.string().allow(null),
      },
    ])
    .required(),
});

module.exports = {
  CreateQuestionSchema,
};
