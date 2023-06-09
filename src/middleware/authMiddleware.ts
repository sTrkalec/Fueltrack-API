// src/middlewares/authMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { blacklistedTokens } from '../app';


interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

// Estenda a interface Request do Express para incluir a propriedade userId
declare module 'express' {
  export interface Request {
    userId?: number;
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  if (blacklistedTokens.includes(token)) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token', error });
  }
};
