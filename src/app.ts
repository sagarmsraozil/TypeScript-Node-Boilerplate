// External modules
import cors from 'cors';
import csurf from 'csurf';
import morgan from 'morgan';
import colors from 'colors';
import helmet from 'helmet';
import dotenv from 'dotenv-safe';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';

// Core modules
import http from 'http';
import path from 'path';

// Local modules
import './schedule/schedule';
import database from './database/database';
import { errorHandler } from 'utils/errorHelper';

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
// Parsing a cookie values // use if your app runs with cookie authentication
app.use(cookieParser());
/* Anti csrf vulnerabilities: To add csrf token in app for axios: axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
data.csrf token should be provided from api call where token is req.csrftoken */
app.use(
  csurf({
    cookie: true,
  })
);
// Body-parser : to handle payloads coming from the server before trusting what's inside it.
app.use(bodyParser.urlencoded({ extended: false }));
// Parse the payloads coming from the server.
app.use(express.json());
// Helps to secure express apps
app.use(helmet());
// Handle media files.
app.use('/media', express.static(path.join(__dirname, 'media')));

// Checking whether the server is running or not.
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

// Database setup
database.on('close', () => {
  // eslint-disable-next-line
  console.log(colors.zalgo.bold.underline('Connection to database is closed.'));
});

database.on('error', () => {
  // eslint-disable-next-line
  console.log(colors.red.bold.underline('Hmm, something went wrong while connecting to database.'));
});

database.once('open', () => {
  // eslint-disable-next-line
  console.log(colors.white.bold.underline('Connected to database.'));
});

// Prepare each routes with api alias before execution.
/**  Example: app.use('/api/user',RegistrationRoute) */

// To perform error handling
app.use(errorHandler);

// Connecting to server.
const portNo = process.env.PORT ?? 5001;

server.listen(portNo, () => {
  // eslint-disable-next-line
  console.log(colors.cyan.underline.bold(`Server is running at port number: ${portNo}`));
});
