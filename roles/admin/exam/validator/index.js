const { CreateExamSchema, EditExamSchema } = require('../schemas');
const ErrorTools = require('../errors');
const errors = new ErrorTools();
const validator = {};

const schemaValidator = (schema, data) => {
  const resultValidation = schema.validate(data);
  if (resultValidation.error) errors.inputIsNotValid(resultValidation.error);
  data = resultValidation.value;
};

validator.createExam = (req, res, next) => {
  schemaValidator(CreateExamSchema, req.body);
  next();
};

validator.editExam = (req, res, next) => {
  schemaValidator(EditExamSchema, req.body);
  next();
};

module.exports = validator;
