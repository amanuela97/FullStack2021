import { State } from "./state";
import { Patient, Diagnosis } from "../types";

const SET_PATIENT_LIST = "SET_PATIENT_LIST";
const ADD_PATIENT = "ADD_PATIENT";
const SET_PATIENT = "SET_PATIENT";
const SET_DIAGNOSES_LIST = "SET_DIAGNOSES_LIST";


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
          ...state.patients
        }
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case SET_PATIENT:
      return {
        ...state,
        patient: action.payload
      };
    case SET_DIAGNOSES_LIST:
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};
