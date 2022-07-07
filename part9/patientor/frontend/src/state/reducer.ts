import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

const SET_PATIENT_LIST = 'SET_PATIENT_LIST';
const ADD_PATIENT = 'ADD_PATIENT';
const SET_PATIENT = 'SET_PATIENT';
const SET_DIAGNOSES_LIST = 'SET_DIAGNOSES_LIST';
const ADD_ENTRY = 'ADD_ENTRY';

export type Action =
  | {
      type: typeof SET_PATIENT_LIST;
      payload: Patient[];
    }
  | {
      type: typeof ADD_PATIENT;
      payload: Patient;
    }
  | {
      type: typeof SET_PATIENT;
      payload: Patient;
    }
  | {
      type: typeof SET_DIAGNOSES_LIST;
      payload: Diagnosis[];
    }
  | {
      type: typeof ADD_ENTRY;
      payload: {
        newEntry: Entry;
        patientId: string;
      };
    };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: SET_PATIENT_LIST,
    payload: patients,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: ADD_PATIENT,
    payload: newPatient,
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: SET_PATIENT,
    payload: patient,
  };
};

export const setDiagnosesList = (diagnosis: Diagnosis[]): Action => {
  return {
    type: SET_DIAGNOSES_LIST,
    payload: diagnosis,
  };
};

export const addEntry = (newEntry: Entry, patientId: string): Action => {
  return {
    type: ADD_ENTRY,
    payload: {
      newEntry,
      patientId,
    },
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PATIENT_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case SET_PATIENT:
      return {
        ...state,
        patient: action.payload,
      };
    case SET_DIAGNOSES_LIST:
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case ADD_ENTRY:
      const patient = state.patients[action.payload.patientId];
      patient.entries = patient.entries
        ? [...patient.entries, action.payload.newEntry]
        : [action.payload.newEntry];
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: patient,
        },
      };
    default:
      return state;
  }
};
