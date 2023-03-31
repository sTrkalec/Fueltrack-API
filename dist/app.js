"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blacklistedTokens = void 0;
// src/index.ts
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const vehicleRoutes_1 = __importDefault(require("./routes/vehicleRoutes"));
const refuelingRoutes_1 = __importDefault(require("./routes/refuelingRoutes"));
exports.blacklistedTokens = [];
// Carrega as variáveis de ambiente do arquivo .env para o Node.js
dotenv_1.default.config();
const app = (0, express_1.default)();
// Aplica middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configura rotas
app.use('/users', userRoutes_1.default);
app.use('/vehicle', vehicleRoutes_1.default);
app.use('/refueling', refuelingRoutes_1.default);
// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map