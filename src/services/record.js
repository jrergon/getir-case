const RecordModel = require('../models/record');

module.exports = class RecordService {
  static search(startDate, endDate, minCount, maxCount) {
    return RecordModel.aggregate(
      [
        {
          $match: {
            createdAt: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $unwind: {
            path: '$counts',
          },
        },
        {
          $group: {
            _id: '$_id',
            key: {
              $first: '$key',
            },
            createdAt: {
              $first: '$createdAt',
            },
            totalCount: {
              $sum: '$counts',
            },
          },
        },
        {
          $match: {
            totalCount: {
              $gte: minCount,
              $lte: maxCount,
            },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ],
    );
  }
};
