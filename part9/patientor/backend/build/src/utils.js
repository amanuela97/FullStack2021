"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, }) => {
    const newPatient = {
        name: parseString(name, 'name'),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseString(ssn, 'ssn'),
        gender: parseGender(gender),
        occupation: parseString(occupation, 'occupation'),
    };
    return newPatient;
};
exports.toNewPatient = toNewPatient;
const toNewEntry = (newEntry) => {
    const isValidEntry = parseEntry(newEntry);
    if (!isValidEntry)
        throw new Error('Invalid entry: ' + newEntry);
    const entry = {
        description: parseString(isValidEntry.description, 'description'),
        date: parseDate(isValidEntry.date),
        specialist: parseString(isValidEntry.specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(isValidEntry.diagnosisCodes),
    };
    switch (isValidEntry.type) {
        case 'HealthCheck':
            return Object.assign(Object.assign({}, entry), { type: isValidEntry.type, healthCheckRating: parseHealthCheckRating(isValidEntry.healthCheckRating) });
        case 'Hospital':
            return Object.assign(Object.assign({}, entry), { type: isValidEntry.type, discharge: {
                    date: parseDate(isValidEntry.discharge.date),
                    criteria: parseString(isValidEntry.discharge.criteria, 'discharge criteria'),
                } });
        case 'OccupationalHealthcare':
            let sickLeave;
            if (isValidEntry.sickLeave &&
                isValidEntry.sickLeave.endDate &&
                isValidEntry.sickLeave.startDate) {
                sickLeave = {
                    startDate: parseDate(isValidEntry.sickLeave.startDate),
                    endDate: parseDate(isValidEntry.sickLeave.endDate),
                };
            }
            return Object.assign(Object.assign({}, entry), { type: isValidEntry.type, employerName: parseString(isValidEntry.employerName, 'employerName'), sickLeave });
        default:
            return assertNever(isValidEntry);
    }
};
exports.toNewEntry = toNewEntry;
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseString = (value, name) => {
    if (!value || !isString(value)) {
        throw new Error(`Incorrect or missing ${name}: ` + name);
    }
    return value;
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!diagnosisCodes)
        return [];
    if (!Array.isArray(diagnosisCodes)) {
        throw new Error('Incorrect diagnosisCodes: ' + diagnosisCodes);
    }
    const arrayOfCodes = [];
    diagnosisCodes.map((code) => {
        if (!isString(code)) {
            throw new Error('Incorrect diagnosisCodes: ' + diagnosisCodes);
        }
        arrayOfCodes.push(code);
    });
    return arrayOfCodes;
};
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
const isHealthCheckRating = (rating) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.HealthCheckRating).includes(Number(rating));
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseEntry = (entry) => {
    if (!entry || !isEntry(entry)) {
        throw new Error('Incorrect or missing entry: ' + entry);
    }
    return entry;
};
const isEntry = (entry) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(entry.type);
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
