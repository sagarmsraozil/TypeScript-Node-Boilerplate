// External modules
import cors from 'cors';
import csurf from 'csurf';
import morgan from 'morgan';
import colors from 'colors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import express, { Request, Response } from 'express';

// Core modules
import http from 'http';
import path from 'path';

// Local modules
import './schedule/schedule';
import { APP_VALUE } from 'configs/index';
import database from './database/database';
import { errorHandler } from 'utils/errorHelper';
import { swaggerOptions } from 'swagger/swagger';
import swaggerDocument from 'swagger/swagger.json';

// Collection of application routes.
/**  Example: import RegistrationRoute from './routes/registrationRoute'; */

// Initializing a server.
const app = express();
const server = http.createServer(app);

// Configuration for developers to check api runtime and its status code in terminal.
if (APP_VALUE.DEVELOPMENT.trim().toLowerCase() === 'development') {
  app.use(morgan('dev'));
}

// Allowed origins
// const allowedOrigins = APP_VALUE.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim().toLowerCase());

// Configuration for application
// Cors: to enable CORS policy for specified origins to use rest APIs. (Like a traffic, checking blue book of vehicle to validate the owner).
app.use(cors());

// IMPORTANT: For more security add which origins can access your server's api. Uncomment allowed origin in line number 34 too.
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (allowedOrigins.includes(origin ?? '')) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS!'));
//       }
//     },
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );
// Parsing a cookie values // use if your app runs with cookie authentication // use res.cookie('cookieName',cookieValue,options) to set cookie into user's browser.
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

// Swagger connection
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { swaggerOptions: { ...swaggerOptions, persistAuthorization: true } })
);

app.get('/api/api-docs/swagger.json', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(swaggerDocument, null, 4));
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
const portNo = APP_VALUE.PORT ?? 5001;

server.listen(portNo, () => {
  // eslint-disable-next-line
  console.log(colors.cyan.underline.bold(`Server is running at port number: ${portNo}`));
});
