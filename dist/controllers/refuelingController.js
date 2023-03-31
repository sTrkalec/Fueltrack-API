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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRefueling = exports.updateRefueling = exports.getRefuelingsByUser = exports.getRefuelingById = exports.createRefueling = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createRefueling = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vehicleId } = req.params;
    const { amount, fuelType, price } = req.body;
    try {
        const refueling = yield prisma.refueling.create({
            data: {
                vehicle: { connect: { id: Number(vehicleId) } },
                amount,
                fuelType,
                price,
            },
            include: { vehicle: true },
        });
        res.status(201).json(refueling);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating refueling', error });
    }
});
exports.createRefueling = createRefueling;
const getRefuelingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idFuel } = req.params;
    try {
        const refueling = yield prisma.refueling.findUnique({
            where: { id: Number(idFuel) },
            include: { vehicle: true },
        });
        if (!refueling) {
            return res.status(404).json({ message: 'Refueling not found' });
        }
        res.status(200).json(refueling);
    }
    catch (error) {
        res.status(400).json({ message: 'Error getting refueling', error });
    }
});
exports.getRefuelingById = getRefuelingById;
const getRefuelingsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const refuelings = yield prisma.refueling.findMany({
            where: { vehicle: { userId: Number(userId) } },
            include: { vehicle: true },
            orderBy: { createdAt: "desc" }
        });
        res.status(200).json(refuelings);
    }
    catch (error) {
        res.status(400).json({ message: 'Error getting refuelings', error });
    }
});
exports.getRefuelingsByUser = getRefuelingsByUser;
const updateRefueling = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idFuel, vehicleId } = req.params;
    const { amount, fuelType, price } = req.body;
    try {
        const refueling = yield prisma.refueling.update({
            where: { id: Number(idFuel) },
            data: {
                vehicle: { connect: { id: Number(vehicleId) } },
                amount,
                fuelType,
                price,
            },
            include: { vehicle: true },
        });
        res.status(200).json(refueling);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating refueling', error });
    }
});
exports.updateRefueling = updateRefueling;
const deleteRefueling = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idFuel } = req.params;
    try {
        yield prisma.refueling.delete({
            where: { id: Number(idFuel) },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting refueling', error });
    }
});
exports.deleteRefueling = deleteRefueling;
//# sourceMappingURL=refuelingController.js.map