import jwt from 'jsonwebtoken';

export const APP_SECRET = 'SomethingSecret';

export interface AuthTokenPayload {
  userId: number;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new Error('No Authentication Token provided');
  }

  return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}
