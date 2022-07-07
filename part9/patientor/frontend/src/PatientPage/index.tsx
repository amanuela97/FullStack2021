import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient, Gender, Entry, Diagnosis } from '../types';
import { useStateValue } from '../state';
import { Typography, Button } from '@material-ui/core';
import { BiMaleSign, BiFemaleSign } from 'react-icons/bi';
import { FaGenderless } from 'react-icons/fa';
import { setPatient, setDiagnosesList } from '../state/reducer';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
import HealthCheck from './HealthCheck';
import { style } from '../constants';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';
import { addEntry } from '../state/reducer';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const openModal = (): void => setModalOpen(true);
  const [newEntryAdded, setNewEntryAdded] = useState<Entry | undefined>(
    undefined
  );

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id as string));
      setNewEntryAdded(newEntry);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id ? id : ''}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosesList(diagnosesListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (JSON.stringify(diagnoses) === '{}') {
      void fetchDiagnosesList();
    }
    if (!patient || patient.id !== id || newEntryAdded) {
      void fetchPatient();
      setNewEntryAdded(undefined);
    }
  }, [id, newEntryAdded]);

  const getIcon = (gender: Gender | undefined) => {
    if (gender === 'male') {
      return <BiMaleSign />;
    } else if (gender === 'female') {
      return <BiFemaleSign />;
    } else if (gender === 'other') {
      return <FaGenderless />;
    } else {
      return null;
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <div>
      <div style={{ ...style, display: 'flex', flexDirection: 'row' }}>
        <Typography variant="h5">{patient.name}</Typography>
        <>{getIcon(patient.gender)}</>
      </div>
      <div style={style}>
        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>
      </div>
      <div style={style}>
        <Typography variant="h6">entries</Typography>
      </div>
      {patient.entries && patient.entries.length > 0 ? (
        <div style={style}>
          {patient.entries.map((entry) => (
            <div key={entry.id}>
              <EntryDetails entry={entry} />
            </div>
          ))}
        </div>
      ) : (
        <p>No entries</p>
      )}
      <div style={style}>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" color="primary" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
    </div>
  );
};

export default PatientPage;
