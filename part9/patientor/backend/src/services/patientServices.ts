import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v4 as uuidv4  } from 'uuid';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
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

const addDiary = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
};
