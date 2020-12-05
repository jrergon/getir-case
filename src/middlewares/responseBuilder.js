module.exports = class ResponseBuilder {
  static buildError(err, res) {
    res.status(err.code || 500).send({
      code: err.code || 500,
      message: err.message,
      records: [],
    });
  }

  static buildSuccess(res) {
    res.send({
      code: 0,
      message: 'Success',
      records: res.data,
    });
  }
};
