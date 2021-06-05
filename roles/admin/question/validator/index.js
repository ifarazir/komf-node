const { bodySchemas, paramSchemas, querySchemas } = require('../schemas');
const ErrorTools = require('../errors');
const errors = new ErrorTools();
const validator = {};

const schemaValidator = (schema, data) => {
  const resultValidation = schema.validate(data);
  if (resultValidation.error) errors.inputIsNotValid(resultValidation.error);
  data = resultValidation.value;
};

validator.createQuestion = (req, res, next) => {
  schemaValidator(bodySchemas.CreateQuestionSchema, req.body);
  next();
};

validator.getQuestions = (req, res, next) => {
  schemaValidator(querySchemas.GetQuestionsSchema, req.query);
  next();
};

validator.deleteQuestion = (req, res, next) => {
  schemaValidator(paramSchemas.mongoObjectIdSchema, req.params);
  next();
};

module.exports = validator;
