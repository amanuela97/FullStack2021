"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getEntries = () => {
    return patients;
};
const getPatientById = (id) => {
    return patients.find((patient) => patient.id === id);
};
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, patient), { entries: [] });
    patients.push(newPatient);
    return newPatient;
};
const addEntry = (patientId, entry) => {
    const patient = getPatientById(patientId);
    if (!patient) {
        throw new Error('patient with this id was not found');
    }
    const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v4)() });
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getEntries,
    addPatient,
    getNonSensitiveEntries,
    getPatientById,
    addEntry,
};
