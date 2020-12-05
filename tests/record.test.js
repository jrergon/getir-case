const mongoose = require('mongoose');
const RecordService = require('../src/services/record');
const RecordModel = require('../src/models/record');
const recordSeed = require('./seeds/record');

beforeAll(async () => {
  const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

  /* eslint-disable-next-line no-underscore-dangle */
  await mongoose.connect(global.__MONGO_URI__, options, (err) => {
    if (err) {
      /* eslint-disable-next-line no-console */
      console.log(err);
      process.exit(1);
    }
  });

  await Promise.all(recordSeed.records.map((record) => (new RecordModel(record)).save()));
});

test('search records with valid data', async () => {
  expect.assertions(2);

  const result = await RecordService.search('2017-01-01', '2017-12-31', 100, 4000);

  expect(result).toBeDefined();
  expect(result.length).toBe(3);
});

test('search records with null values', async () => {
  expect.assertions(2);

  const result = await RecordService.search(null, null, null, null);

  expect(result).toBeDefined();
  expect(result.length).toBe(0);
});

test('search records with invalid values', async () => {
  expect.assertions(2);

  const result = await RecordService.search('2017-12-31', '2017-01-01', 4000, 100);

  expect(result).toBeDefined();
  expect(result.length).toBe(0);
});

test('search records with null dates', async () => {
  expect.assertions(2);

  const result = await RecordService.search(null, null, 4000, 100);

  expect(result).toBeDefined();
  expect(result.length).toBe(0);
});

test('search records with null counts', async () => {
  expect.assertions(2);

  const result = await RecordService.search('2017-01-01', '2017-12-31', null, null);

  expect(result).toBeDefined();
  expect(result.length).toBe(0);
});

afterAll(() => {
  mongoose.disconnect();
});
