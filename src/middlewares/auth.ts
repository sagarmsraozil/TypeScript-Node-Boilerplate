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
//     const token = req.headers.authorization?.split(' ')[1] ?? '';
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
//     const error = err as Error;

//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
