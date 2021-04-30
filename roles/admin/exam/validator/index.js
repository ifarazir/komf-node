const { ExamSchema } = require('../schemas');
const ErrorTools = require('../errors');
const errors = new ErrorTools();
const validator = {};

const schemaValidator = (schema, data) => {
  const resultValidation = schema.validate(data);
  if (resultValidation.error) errors.inputIsNotValid(resultValidation.error);
  data = resultValidation.value;
};

validator.createExam = (req, res, next) => {
  schemaValidator(ExamSchema, req.body);
  next();
};

module.exports = validator;
