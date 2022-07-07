import patientData from '../../data/patients';
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
    entries: [] as Entry[],
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = getPatientById(patientId);
  if (!patient) {
    throw new Error('patient with this id was not found');
  }
  const newEntry: Entry = {
    ...entry,
    id: uuidv4(),
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  getPatientById,
  addEntry,
};
