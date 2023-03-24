import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '3h',
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { cpf, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { cpf, password: hashedPassword },
    });
    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { cpf, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { cpf } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = generateToken(user.id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { id: req.userId },
      include: { 
        vehicles: {
          include: {
            refuelings: true
          }
        } 
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error getting users', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (Number(id) !== req.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (Number(id) !== req.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
      include: { vehicles: true },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error });
  }
};