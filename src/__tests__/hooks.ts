import mongoose, { ConnectOptions } from 'mongoose';
import { beforeAll, afterAll } from '@jest/globals';

const testDatabaseName = 'ECommerceTesting';
const testDBHost = `mongodb://127.0.0.1:27017/${testDatabaseName}`;

const options: ConnectOptions = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false,
};

beforeAll(async () => {
  await mongoose.connect(testDBHost, options);
});

afterAll(async () => {
  await mongoose.connection.close();
});
