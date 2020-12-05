const ValidationError = require('../utils/validationError');

module.exports = class RequestValidator {
  static validate(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      const valid = error == null;

      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');

        throw new ValidationError(message);
      }
    };
  }
};
