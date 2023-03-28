import { Request, Response, NextFunction } from 'express';


const plateRegex = /^[A-Z]{3}-\d{4}$/;

export const validatePlate = (req: Request, res: Response, next: NextFunction) => {
  const { plate } = req.body;

  if (!plate || !plateRegex.test(plate.replace(/\s/g, '').toUpperCase())) {
    return res.status(400).json({ message: 'Invalid plate number', plate });
  }

  next();
};


const renavamRegex = /^[0-9]{11}$/;

export const validateRenavam = (req: Request, res: Response, next: NextFunction) => {
  const { renavam } = req.body;

  if (!renavamRegex.test(renavam)) {
    return res.status(400).json({ message: 'Renavam number is invalid' });
  }

  next();
};
