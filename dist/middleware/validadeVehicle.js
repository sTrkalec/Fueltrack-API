"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRenavam = exports.validatePlate = void 0;
const plateRegex = /^[A-Z]{3}-\d{4}$/;
const validatePlate = (req, res, next) => {
    const { plate } = req.body;
    if (!plate || !plateRegex.test(plate.replace(/\s/g, '').toUpperCase())) {
        return res.status(400).json({ message: 'Invalid plate number', plate });
    }
    next();
};
exports.validatePlate = validatePlate;
const renavamRegex = /^[0-9]{11}$/;
const validateRenavam = (req, res, next) => {
    const { renavam } = req.body;
    if (!renavamRegex.test(renavam)) {
        return res.status(400).json({ message: 'Renavam number is invalid' });
    }
    next();
};
exports.validateRenavam = validateRenavam;
//# sourceMappingURL=validadeVehicle.js.map