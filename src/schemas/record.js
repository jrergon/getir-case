const Joi = require('joi');

exports.record = Joi.object().keys({
  startDate: Joi.date().required(),
  endDate: Joi.date().required().greater(Joi.ref('startDate')),
  minCount: Joi.number().required().min(0),
  maxCount: Joi.number().required().greater(Joi.ref('minCount')),
});
