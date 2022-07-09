// ***  Just a helper file *** //
// import { JwtPayload } from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// import { verifyToken } from 'utils/helper';
// import UserRegistration from 'models/userRegistrationModel';
// import { CustomRequestInterface } from 'interfaces/helperInterface';

// /**
//  * User authorization middleware
//  * @param req
//  * @param res
//  * @param next
//  * @returns
//  */
// export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//    const cookieToken = req.cookies.accessToken;
//     const token = req.headers.authorization?.split(' ')[1] ?? '';
//     Use cookieToken or token for verification, according to need
//     const decodedData = (await verifyToken(token, process.env.SECRET_KEY ?? '')) as JwtPayload;

//     if (decodedData) {
//       const user = await UserRegistration.findOne({
//         _id: decodedData.userAccId,
//       }).select('+password');

//       if (user) {
//         (req as CustomRequestInterface).user = user;

//         next();
//       } else {
//         return res.status(401).json({ success: false, message: 'Unauthorized.' });
//       }
//     } else {
//       return res.status(401).json({ success: false, message: 'Unauthorized.' });
//     }
//   } catch (err) {
// let statusCode = 500;

// let errorMessage = error.message;

// if (errorMessage === 'jwt expired' || errorMessage === 'jwt must be provided') {
//   errorMessage = 'Session time out! Please, login to access contents!';
//   statusCode = 401;
// }

// return res.status(statusCode).json({ success: false, message: errorMessage });
//   }
// };
