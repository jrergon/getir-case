module.exports = class ValidationError extends Error {
  constructor(message, code = 422) {
    super();

    this.code = code;
    this.message = message;
  }
};
