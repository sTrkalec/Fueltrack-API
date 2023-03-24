import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


const prisma = new PrismaClient();

export const createRefueling = async (req: Request, res: Response) => {

  const { vehicleId } = req.params;
  const { amount, fuelType, price } = req.body;

  try {
    const refueling = await prisma.refueling.create({
      data: {
        vehicle: { connect: { id: Number(vehicleId) } },
        amount,
        fuelType,
        price,
      },
      include: { vehicle: true },

    });
    res.status(201).json(refueling);
  } catch (error) {
    res.status(400).json({ message: 'Error creating refueling', error });
  }
};

export const getRefuelingById = async (req: Request, res: Response) => {
  const { idFuel } = req.params;

  try {
    const refueling = await prisma.refueling.findUnique({
      where: { id: Number(idFuel) },
      include: { vehicle: true },
    });
    if (!refueling) {
      return res.status(404).json({ message: 'Refueling not found' });
    }
    res.status(200).json(refueling);
  } catch (error) {
    res.status(400).json({ message: 'Error getting refueling', error });
  }
};

export const getRefuelingsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const refuelings = await prisma.refueling.findMany({
      where: { vehicle: { userId: Number(userId) } },
      include: { vehicle: true },
      orderBy: {createdAt: "desc"}
    });
    res.status(200).json(refuelings);
  } catch (error) {
    res.status(400).json({ message: 'Error getting refuelings', error });
  }
};

export const updateRefueling = async (req: Request, res: Response) => {
  const { idFuel, vehicleId } = req.params;
  const { amount, fuelType, price } = req.body;

  try {
    const refueling = await prisma.refueling.update({
      where: { id: Number(idFuel) },
      data: {
        vehicle: { connect: { id: Number(vehicleId)} },
        amount,
        fuelType,
        price,
      },
      include: { vehicle: true },
    });
    res.status(200).json(refueling, );
  } catch (error) {
    res.status(400).json({ message: 'Error updating refueling', error });
  }
};

export const deleteRefueling = async (req: Request, res: Response) => {
  const { idFuel } = req.params;

  try {
    await prisma.refueling.delete({
      where: { id: Number(idFuel) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting refueling', error });
  }
};
