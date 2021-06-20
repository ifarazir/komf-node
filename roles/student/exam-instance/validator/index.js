const { bodySchemas, paramSchemas, querySchemas } = require('../schemas');
const ErrorTools = require('../errors');
const errors = new ErrorTools();
const validator = {};

validator.createExamInstance = (req, res, next) => {
  schemaValidator(bodySchemas.CreateExamInstanceSchema, req.body);
  next();
};

const schemaValidator = (schema, data) => {
  const resultValidation = schema.validate(data);
  if (resultValidation.error) errors.inputIsNotValid(resultValidation.error);
  data = resultValidation.value;
};

module.exports = validator;
