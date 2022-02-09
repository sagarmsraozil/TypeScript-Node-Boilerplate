import { Express } from 'express';

import { UserInterface } from './userInterface';

// eslint-disable-next-line
export interface ObjectKeys<T = any> {
  [key: string]: T;
}

export interface CustomRequestInterface extends Express {
  user: UserInterface;
}

// For req.fields functionality of multer.
// initialization : line 1 :const files = req.files as MultipleImagesInterface
// line 2 : files.images
export interface MultipleImagesInterface extends ObjectKeys<Express.Multer.File[]> {
  images: Express.Multer.File[];
}
