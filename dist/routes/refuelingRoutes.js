"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const refuelingController_1 = require("../controllers/refuelingController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/vehicle/:vehicleId/', authMiddleware_1.authMiddleware, refuelingController_1.createRefueling);
router.get('/:idFuel', authMiddleware_1.authMiddleware, refuelingController_1.getRefuelingById);
router.get('/', authMiddleware_1.authMiddleware, refuelingController_1.getRefuelingsByUser);
router.put('/vehicle/:vehicleId/:idFuel/', authMiddleware_1.authMiddleware, refuelingController_1.updateRefueling);
router.delete('/:idFuel', authMiddleware_1.authMiddleware, refuelingController_1.deleteRefueling);
exports.default = router;
//# sourceMappingURL=refuelingRoutes.js.map