const mongoose = require('mongoose');

const { Schema } = mongoose;

const record = new Schema(
  {
    key: {
      type: Schema.Types.String,
    },
    value: {
      type: Schema.Types.String,
    },
    createdAt: {
      type: Schema.Types.Date,
    },
    counts: {
      type: [Schema.Types.Number],
    },
  },
);

module.exports = mongoose.model('records', record);
