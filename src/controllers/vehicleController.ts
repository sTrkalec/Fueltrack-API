// src/controllers/VehicleController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        ...req.body,
        user: {
          connect: {
            id: req.userId,
          },
        },
      },
    });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: 'Error creating vehicle', error });
  }
};

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        userId: req.userId,
      },
      include: { refuelings: {
        orderBy: {createdAt: "desc"}
      } },
      orderBy: {createdAt: "desc"}
    });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ message: 'Error getting vehicles', error });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: Number(id),
      },
      include: { refuelings: {
        orderBy : {createdAt: "desc"}
      } },
    });

    if (!vehicle || vehicle.userId !== req.userId) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: 'Error getting vehicle', error });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!vehicle || vehicle.userId !== req.userId) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const updatedVehicle = await prisma.vehicle.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: 'Error updating vehicle', error });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!vehicle || vehicle.userId !== req.userId) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    await prisma.vehicle.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting vehicle', error });
  }
};

  