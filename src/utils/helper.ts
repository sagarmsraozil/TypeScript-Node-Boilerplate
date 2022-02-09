import jwt from 'jsonwebtoken';

/**
 * Verify user login expiration
 * @param token
 * @param secretKey
 * @returns
 */
export const verifyToken = async (token: string, secretKey: string): Promise<string | jwt.JwtPayload | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => (error ? reject(error.message) : resolve(decoded)));
  });
};
