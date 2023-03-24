import { Request, Response, NextFunction } from 'express';

const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  return regex.test(password);
};

export const passwordMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        'Invalid password. The password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter and 1 number.',
    });
  }
  return next();
};
