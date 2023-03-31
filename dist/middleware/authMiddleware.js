"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../app");
const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: 'Authorization token required' });
    }
    const token = authorization.split(' ')[1];
    if (app_1.blacklistedTokens.includes(token)) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map