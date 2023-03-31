"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
const prisma = new client_1.PrismaClient();
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3h',
    });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpf, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: { cpf, password: hashedPassword },
        });
        generateToken(user.id);
        res.status(201).json({ user });
    }
    catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpf, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { cpf } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = generateToken(user.id);
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            where: { id: req.userId },
            include: {
                vehicles: {
                    orderBy: { createdAt: "desc" },
                    include: {
                        refuelings: {
                            orderBy: { createdAt: "desc" }
                        },
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ message: 'Error getting users', error });
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (Number(id) !== req.userId) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const { cpf, password } = req.body;
        const user = yield prisma.user.update({
            where: { id: Number(id) },
            data: {
                cpf,
                password: password && (yield bcrypt_1.default.hash(password, 10)),
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    if (Number(id) !== req.userId) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const user = yield prisma.user.findUnique({
            where: { id: Number(id) },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield prisma.user.delete({
            where: { id: Number(id) },
        });
        // Adicione o token do usuário à lista negra
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (token) {
            app_1.blacklistedTokens.push(token);
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map