import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  roles: string[];
}

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
    roles?: string[];
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.header('Authorization');
  const token = header && header.split(' ')[1];
  if (token == null) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  try {
    const decode = Jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.userId = decode.userId;
    req.roles = decode.roles;
    if (!req.roles.includes('seller')) {
      return res.status(403).json({ error: 'Forbidden: Access is denied' });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default auth;
