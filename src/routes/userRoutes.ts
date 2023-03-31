// src/routes/userRoutes.ts
import express from 'express';
import { deleteUser, getUsers, loginUser, registerUser, updateUser } from '../controllers/userController';

import { authMiddleware } from '../middleware/authMiddleware';
import { cpfMiddleware, passwordMiddleware } from '../middleware/validateUserMiddleware';

const router = express.Router();

router.post('/register',cpfMiddleware, passwordMiddleware, registerUser);
router.post('/login', loginUser);
router.get('/', authMiddleware, getUsers);
router.put('/:id', authMiddleware,passwordMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
