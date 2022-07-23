import dotenv from 'dotenv-safe';

// Dotenv configuration for handling and reading .env variables.
dotenv.config({
  path: './.env',
});

export const APP_VALUE = {
  DEVELOPMENT: process.env.NODE_ENV ?? '',
  PORT: process.env.PORT ?? '',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000,https:domainname.com',
};
