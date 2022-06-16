import { NewPatient, Gender, Entry } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries) || [],
    };

  return newEntry;
};

const isEntry = (entry: any):  entry is Entry  => {
  if(!isString(entry.type)) return false;
  return ["HealthCheck","Hospital","OccupationalHealthcare"].includes(entry.type as string);
};

const parseEntries = (entries: any): Entry[] => {
  let isEntryType = false;
  for (const entry of entries) {
    if(!isEntry(entry)){
      isEntryType = true;
    }
  }
  if(!entries || isEntryType){
    throw new Error('Incorrect or missing entries: ' +  entries);
  }
  return entries as Entry[];
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
