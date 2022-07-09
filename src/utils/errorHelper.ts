import { Request, Response, NextFunction } from 'express';

import { STATUS_CODES } from 'constants/statusCodes'; // add this file in utils instead of constants

// eslint-disable-next-line
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = error.message;
  let statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;

  if (errorMessage === 'jwt expired') {
    errorMessage = 'Time over, Please generate new one!';
    statusCode = STATUS_CODES.FORBIDDEN;
  }

  return res.status(statusCode).json({ success: false, message: errorMessage });
};

export const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any> // eslint-disable-line
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next).catch(next));
