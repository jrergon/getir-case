const express = require('express');

const router = express.Router();
const RecordController = require('../controllers/record');
const RequestValidator = require('../middlewares/requestValidator');
const recordSchema = require('../schemas/record');

router.post('/records', RequestValidator.validate(recordSchema.record), RecordController.getRecords);

module.exports = router;
