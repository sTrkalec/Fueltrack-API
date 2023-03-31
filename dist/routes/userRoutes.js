"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validateUserMiddleware_1 = require("../middleware/validateUserMiddleware");
const router = express_1.default.Router();
router.post('/register', validateUserMiddleware_1.cpfMiddleware, validateUserMiddleware_1.passwordMiddleware, userController_1.registerUser);
router.post('/login', userController_1.loginUser);
router.get('/', authMiddleware_1.authMiddleware, userController_1.getUsers);
router.put('/:id', authMiddleware_1.authMiddleware, validateUserMiddleware_1.passwordMiddleware, userController_1.updateUser);
router.delete('/:id', authMiddleware_1.authMiddleware, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map