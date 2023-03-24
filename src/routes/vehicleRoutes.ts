// src/routes/vehicleRoutes.ts
import express from 'express';
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validatePlate, validateRenavam } from '../middleware/validadeVehicle';

const router = express.Router();

router.post('/', authMiddleware, validatePlate , validateRenavam,  createVehicle);
router.get('/', authMiddleware, getVehicles);
router.get('/:id', authMiddleware, getVehicleById);
router.put('/:id', authMiddleware, validatePlate , validateRenavam, updateVehicle);
router.delete('/:id', authMiddleware, deleteVehicle);

export default router;
