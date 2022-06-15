import { State } from "./state";
import { Patient } from "../types";

const SET_PATIENT_LIST = "SET_PATIENT_LIST";
const ADD_PATIENT = "ADD_PATIENT";
const SET_PATIENT = "SET_PATIENT";

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
    default:
      return state;
  }
};
