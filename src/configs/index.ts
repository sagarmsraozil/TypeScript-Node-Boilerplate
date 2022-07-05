import dotenv from 'dotenv-safe';

// Dotenv configuration for handling and reading .env variables.
dotenv.config({
  path: './.env',
});

export const APP_VALUE = {
  DEVELOPMENT: process.env.NODE_ENV ?? '',
  PORT: process.env.PORT ?? '',
};
