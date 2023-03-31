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
exports.deleteVehicle = exports.updateVehicle = exports.getVehicleById = exports.getVehicles = exports.createVehicle = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield prisma.vehicle.create({
            data: Object.assign(Object.assign({}, req.body), { user: {
                    connect: {
                        id: req.userId,
                    },
                } }),
        });
        res.status(201).json(vehicle);
    }
    catch (error) {
        res.status(400).json({ message: 'Placa ou Renavam já registrada', error });
    }
});
exports.createVehicle = createVehicle;
const getVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield prisma.vehicle.findMany({
            where: {
                userId: req.userId,
            },
            include: { refuelings: {
                    orderBy: { createdAt: "desc" }
                } },
            orderBy: { createdAt: "desc" }
        });
        res.status(200).json(vehicles);
    }
    catch (error) {
        res.status(400).json({ message: 'Error getting vehicles', error });
    }
});
exports.getVehicles = getVehicles;
const getVehicleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vehicle = yield prisma.vehicle.findUnique({
            where: {
                id: Number(id),
            },
            include: { refuelings: {
                    orderBy: { createdAt: "desc" }
                } },
        });
        if (!vehicle || vehicle.userId !== req.userId) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    }
    catch (error) {
        res.status(400).json({ message: 'Error getting vehicle', error });
    }
});
exports.getVehicleById = getVehicleById;
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vehicle = yield prisma.vehicle.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!vehicle || vehicle.userId !== req.userId) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        const updatedVehicle = yield prisma.vehicle.update({
            where: { id: Number(id) },
            data: req.body,
        });
        res.status(200).json(updatedVehicle);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating vehicle', error });
    }
});
exports.updateVehicle = updateVehicle;
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vehicle = yield prisma.vehicle.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!vehicle || vehicle.userId !== req.userId) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        yield prisma.vehicle.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting vehicle', error });
    }
});
exports.deleteVehicle = deleteVehicle;
//# sourceMappingURL=vehicleController.js.map