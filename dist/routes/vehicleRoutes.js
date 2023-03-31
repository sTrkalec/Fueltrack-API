"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/vehicleRoutes.ts
const express_1 = __importDefault(require("express"));
const vehicleController_1 = require("../controllers/vehicleController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validadeVehicle_1 = require("../middleware/validadeVehicle");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authMiddleware, validadeVehicle_1.validatePlate, validadeVehicle_1.validateRenavam, vehicleController_1.createVehicle);
router.get('/', authMiddleware_1.authMiddleware, vehicleController_1.getVehicles);
router.get('/:id', authMiddleware_1.authMiddleware, vehicleController_1.getVehicleById);
router.put('/:id', authMiddleware_1.authMiddleware, validadeVehicle_1.validatePlate, validadeVehicle_1.validateRenavam, vehicleController_1.updateVehicle);
router.delete('/:id', authMiddleware_1.authMiddleware, vehicleController_1.deleteVehicle);
exports.default = router;
//# sourceMappingURL=vehicleRoutes.js.map