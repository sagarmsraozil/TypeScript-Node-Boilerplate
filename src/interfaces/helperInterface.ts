import { Express } from 'express';

import { UserInterface } from './userInterface';

// eslint-disable-next-line
export interface ObjectKeys<T = any> {
  [key: string]: T;
}

export interface CustomRequestInterface extends Express {
  user: UserInterface;
}

export interface MultipleImagesInterface extends ObjectKeys<Express.Multer.File[]> {
  images: Express.Multer.File[];
}

export interface StatusCodeInterface {
  SUCCESS: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  FORBIDDEN: number;
  NOT_FOUND: number;
  NOT_ACCEPTABLE: number;
  REQUEST_TIMEOUT: number;
  CONFLICT: number;
  INTERNAL_SERVER_ERROR: number;
}
