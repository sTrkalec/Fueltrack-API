import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


const prisma = new PrismaClient();

export const createRefueling = async (req: Request, res: Response) => {
  const { vehicleId, amount, fuelType, price } = req.body;

  try {
    const refueling = await prisma.refueling.create({
      data: {
        vehicle: { connect: { id: vehicleId } },
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
  const { id } = req.params;

  try {
    const refueling = await prisma.refueling.findUnique({
      where: { id: Number(id) },
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

export const updateRefueling = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { vehicleId, amount, fuelType, price } = req.body;

  try {
    const refueling = await prisma.refueling.update({
      where: { id: Number(id) },
      data: {
        vehicle: { connect: { id: vehicleId } },
        amount,
        fuelType,
        price,
      },
      include: { vehicle: true },
    });
    res.status(200).json(refueling);
  } catch (error) {
    res.status(400).json({ message: 'Error updating refueling', error });
  }
};

export const deleteRefueling = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.refueling.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting refueling', error });
  }
};
