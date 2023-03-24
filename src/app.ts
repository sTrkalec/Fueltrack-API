// src/index.ts
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import refuelingRoutes from './routes/refuelingRoutes';


// Carrega as variáveis de ambiente do arquivo .env para o Node.js
dotenv.config();

const app = express();

// Aplica middlewares
app.use(cors());
app.use(express.json());

// Configura rotas
app.use('/users', userRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/refueling', refuelingRoutes);


// Inicia o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
