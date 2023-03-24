import { Request, Response, NextFunction } from 'express';

const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf === '') {
    return false;
  }
  if (cpf.length !== 11) {
    return false;
  }
  if (
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false;
  }
  let add = 0;
  let i;
  for (i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpf.charAt(9))) {
    return false;
  }
  add = 0;
  for (i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
};

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

export const cpfMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cpf } = req.body;
  if (!validateCPF(cpf)) {
    return res.status(400).json({ message: 'Invalid CPF' });
  }
  return next();
};



