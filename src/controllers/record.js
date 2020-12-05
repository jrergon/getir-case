const RecordService = require('../services/record');

module.exports = class RecordController {
  static async getRecords(req, res, next) {
    const {
      startDate, endDate, minCount, maxCount,
    } = req.body;

    res.data = await RecordService.search(startDate, endDate, minCount, maxCount);
    next();
  }
};
