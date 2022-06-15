import { NewPatient, Gender } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
    };

  return newEntry;
};


const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' +  name);
    }
  
    return name;
};

  
const parseDateOfBirth = (dateOfBirth: any): string => {
if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
}
return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn ' + ssn);
    }
  
    return ssn;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation ' + occupation);
    }
  
    return occupation;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;
