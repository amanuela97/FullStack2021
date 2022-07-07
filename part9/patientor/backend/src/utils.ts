import {
  Gender,
  NewEntry,
  BaseEntry,
  Diagnosis,
  HealthCheckRating,
  NewPatient,
} from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
  };

  return newPatient;
};

const toNewEntry = (newEntry: any): NewEntry => {
  const isValidEntry = parseEntry(newEntry);
  if (!isValidEntry) throw new Error('Invalid entry: ' + newEntry);
  const entry: Omit<BaseEntry, 'id'> = {
    description: parseString(isValidEntry.description, 'description'),
    date: parseDate(isValidEntry.date),
    specialist: parseString(isValidEntry.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(isValidEntry.diagnosisCodes),
  };
  switch (isValidEntry.type) {
    case 'HealthCheck':
      return {
        ...entry,
        type: isValidEntry.type,
        healthCheckRating: parseHealthCheckRating(
          isValidEntry.healthCheckRating
        ),
      };
    case 'Hospital':
      return {
        ...entry,
        type: isValidEntry.type,
        discharge: {
          date: parseDate(isValidEntry.discharge.date),
          criteria: parseString(
            isValidEntry.discharge.criteria,
            'discharge criteria'
          ),
        },
      };
    case 'OccupationalHealthcare':
      let sickLeave;
      if (
        isValidEntry.sickLeave &&
        isValidEntry.sickLeave.endDate &&
        isValidEntry.sickLeave.startDate
      ) {
        sickLeave = {
          startDate: parseDate(isValidEntry.sickLeave.startDate),
          endDate: parseDate(isValidEntry.sickLeave.endDate),
        };
      }
      return {
        ...entry,
        type: isValidEntry.type,
        employerName: parseString(isValidEntry.employerName, 'employerName'),
        sickLeave,
      };
    default:
      return assertNever(isValidEntry);
  }
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseString = (value: any, name: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${name}: ` + name);
  }
  return value;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (!diagnosisCodes) return [];

  if (!Array.isArray(diagnosisCodes)) {
    throw new Error('Incorrect diagnosisCodes: ' + diagnosisCodes);
  }

  const arrayOfCodes: Array<Diagnosis['code']> = [];
  diagnosisCodes.map((code: any) => {
    if (!isString(code)) {
      throw new Error('Incorrect diagnosisCodes: ' + diagnosisCodes);
    }
    arrayOfCodes.push(code);
  });

  return arrayOfCodes;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(Number(rating));
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      'Incorrect or missing healthCheckRating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseEntry = (entry: any): NewEntry => {
  if (!entry || !isEntry(entry)) {
    throw new Error('Incorrect or missing entry: ' + entry);
  }
  return entry;
};

const isEntry = (entry: any): entry is NewEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(
    entry.type as string
  );
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
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

export { toNewPatient, toNewEntry };
