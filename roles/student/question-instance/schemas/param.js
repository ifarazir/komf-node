const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const mongoObjectIdSchema = Joi.object().keys({
  id: Joi.objectId().required(),
});

module.exports = {
  // mongoObjectIdSchema,
};
