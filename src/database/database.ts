import colors from 'colors';
import mongoose, { ConnectOptions } from 'mongoose';

const databaseName = 'balanceSheet';
const mongodbPath = process.env.MONGO_DB_URL ?? `mongodb://127.0.0.1:27017/${databaseName}`;

const options: ConnectOptions = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false,
};

mongoose
  .connect(mongodbPath, options)
  // eslint-disable-next-line
  .then(() => console.log(colors.bold.underline('Connected to database')))
  // eslint-disable-next-line
  .catch(() => console.log(colors.red.bold.underline('Hmm, got error while connecting to database.')));
