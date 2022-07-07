"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesServices_1 = __importDefault(require("../services/diagnosesServices"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const diagnoses = diagnosesServices_1.default.getDiagnoses();
    res.send(diagnoses);
});
exports.default = router;
