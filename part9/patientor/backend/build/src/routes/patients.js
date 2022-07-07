"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientServices_1 = __importDefault(require("../services/patientServices"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientServices_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const entry = patientServices_1.default.getPatientById(req.params.id);
    if (entry) {
        res.json(entry);
    }
    else {
        res.status(404).send(`Patient with ${req.params.id} was not found`);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patientServices_1.default.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const addedEntry = patientServices_1.default.addEntry(req.params.id, newEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
