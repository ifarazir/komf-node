const Joi = require('joi');

const CreateQuestionSchema = Joi.object().keys({
  examId: Joi.string().max(30).required(),
  questionParentId: Joi.alternatives()
    .conditional('type', [
      {
        is: 'body',
        then: Joi.valid(null).required(),
      },
      {
        is: 'singleChoice',
        then: Joi.string().max(30),
      },
      {
        is: 'multiChoice',
        then: Joi.string().max(30),
      },
      {
        is: 'ordering',
        then: Joi.string().max(30),
      },
    ])
    .required(),
  content: Joi.string().min(10).max(10000000000).required(),
  questionNumber: Joi.alternatives()
    .conditional('type', [
      {
        is: 'body',
        then: Joi.valid(null).required(),
      },
      {
        is: 'singleChoice',
        then: Joi.number().integer().required().min(1).max(50),
      },
      {
        is: 'multiChoice',
        then: Joi.number().integer().required().min(1).max(50),
      },
      {
        is: 'ordering',
        then: Joi.number().integer().required().min(1).max(50),
      },
    ])
    .required(),
  file: Joi.string().max(1000), // TODO: Conditional validation base on section and type combination
  section: Joi.alternatives()
    .conditional('type', [
      {
        is: 'body',
        then: Joi.string()
          .valid('reading', 'listening', 'speaking', 'writing')
          .required(),
      },
      {
        is: 'singleChoice',
        then: Joi.valid(null).required(),
      },
      {
        is: 'multiChoice',
        then: Joi.valid(null).required(),
      },
      {
        is: 'ordering',
        then: Joi.valid(null).required(),
      },
    ])
    .required(),
  type: Joi.alternatives()
    .conditional('section', [
      {
        is: 'reading',
        then: Joi.string()
          .valid('body', 'singleChoice', 'multiChoice', 'ordering')
          .required(),
      },
      {
        is: 'listening',
        then: Joi.string()
          .valid('body', 'singleChoice', 'multiChoice', 'ordering')
          .required(),
      },
      {
        is: 'speaking',
        then: Joi.string().valid('body').required(),
      },
      {
        is: 'writing',
        then: Joi.string().valid('body').required(),
      },
    ])
    .required(),

  part: Joi.alternatives()
    .conditional('type', [
      {
        is: 'body',
        then: Joi.number().integer().valid(1, 2, 3, 4).required(),
      },
      {
        is: 'singleChoice',
        then: Joi.valid(null).required(),
      },
      {
        is: 'multiChoice',
        then: Joi.valid(null).required(),
      },
      {
        is: 'ordering',
        then: Joi.valid(null).required(),
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
        then: Joi.valid(null).required(),
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
        then: Joi.valid(null).required(),
      },
    ])
    .required(),
});

module.exports = {
  CreateQuestionSchema,
};
