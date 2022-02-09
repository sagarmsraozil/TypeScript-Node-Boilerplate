// External modules
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import dotenv from 'dotenv-safe';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';

// Core modules
import http from 'http';
import path from 'path';

// Local modules
import './database/database';
import './schedule/schedule';

// Collection of application routes.
/**  Example: import RegistrationRoute from './routes/registrationRoute'; */

// Dotenv configuration for handling and reading .env variables.
dotenv.config({
  path: './.env',
});

// Initializing a server.
const app = express();
const server = http.createServer(app);

// Configuration for developers to check api runtime and its status code in terminal.
if (process.env.NODE_ENV?.trim().toLowerCase() === 'development') {
  app.use(morgan('dev'));
}

// Configuration for application
// Cors: to enable CORS policy for third party domains to use rest APIs. (Like a traffic, checking blue book of vehicle to validate the owner).
app.use(cors());
// Body-parser : to handle payloads coming from the server before trusting what's inside it.
app.use(bodyParser.urlencoded({ extended: false }));
// Parse the payloads coming from the server.
app.use(express.json());
// Handle media files.
app.use('/media', express.static(path.join(__dirname, 'media')));

// Checking whether the server is running or not.
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

// Prepare each routes with api alias before execution.
/**  Example: app.use('/api/user',RegistrationRoute) */

// Connecting to server.
const portNo = process.env.PORT ?? 5001;

server.listen(portNo, () => {
  // eslint-disable-next-line
  console.log(colors.cyan.underline.bold(`Server is running at port number: ${portNo}`));
});
