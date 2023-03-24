import express from 'express';
import { createRefueling, deleteRefueling, getRefuelingById, updateRefueling } from '../controllers/refuelingController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createRefueling);
router.get('/:id', authMiddleware, getRefuelingById);
router.put('/:id', authMiddleware, updateRefueling);
router.delete('/:id', authMiddleware, deleteRefueling);

export default router;