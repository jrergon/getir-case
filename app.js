const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const configs = require('./src/configs/index');
const router = require('./src/routes/index');
const ResponseBuilder = require('./src/middlewares/responseBuilder');

const app = express();

mongoose.connect(configs.MONGODB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
  ResponseBuilder.buildError(err, res);
});

/* eslint-disable-next-line no-unused-vars */
app.use((req, res, next) => {
  ResponseBuilder.buildSuccess(res);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.disconnect();
  process.exit(0);
});

module.exports = app;
