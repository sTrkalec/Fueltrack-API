import express from 'express';
import { createRefueling, deleteRefueling, getRefuelingById, getRefuelingsByUser, updateRefueling } from '../controllers/refuelingController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/vehicle/:vehicleId/', authMiddleware, createRefueling);
router.get('/:idFuel', authMiddleware, getRefuelingById);
router.get('/', authMiddleware, getRefuelingsByUser);
router.put('/vehicle/:vehicleId/:idFuel/', authMiddleware, updateRefueling);
router.delete('/:idFuel', authMiddleware, deleteRefueling);

export default router;