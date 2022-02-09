import { Request, Express } from 'express';
import multer, { FileFilterCallback } from 'multer';

// Custom datatypes for supporting multer usage.
type DestinationCallBack = (error: Error | null, destination: string) => void; // eslint-disable-line
type FileNameCallBack = (error: Error | null, fileName: string) => void; // eslint-disable-line

// For storage
const fileStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callBack: DestinationCallBack) => {
    callBack(null, './src/media');
  },
  filename: (req: Request, file: Express.Multer.File, callBack: FileNameCallBack) => {
    callBack(null, Date.now() + file.originalname);
  },
});

// File filtration
const fileFilter = (req: Request, file: Express.Multer.File, callBack: FileFilterCallback) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    callBack(null, true);
  } else {
    callBack(null, false);
  }
};

// Upload file
const upload = multer({
  storage: fileStorage,
  fileFilter,
});

export default upload;
