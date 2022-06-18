import { useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient, Gender, Entry } from '../types';
import { useStateValue } from '../state';
import { Typography, Button} from "@material-ui/core";
import { BiMaleSign, BiFemaleSign } from 'react-icons/bi';
import { FaGenderless } from 'react-icons/fa';
import { setPatient } from "../state/reducer";
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
import HealthCheck from './HealthCheck';
import { style } from '../constants';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
      switch(entry.type) {
        case 'Hospital':
          return <Hospital entry={entry}/>;
        case 'HealthCheck':
          return <HealthCheck entry={entry}/>;
        case 'OccupationalHealthcare':
          return <OccupationalHealthcare entry={entry}/>;
        default:
          return assertNever(entry);
      }
};

const PatientPage = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

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
        if(!patient || patient?.id !== id) {
            void fetchPatient();
        }
    },[id]);

    const getIcon = (gender: Gender | undefined) => {
      if(gender === "male"){
        return <BiMaleSign />;
      }else if(gender === "female"){
        return <BiFemaleSign />;
      }else if(gender === "other"){
        return <FaGenderless />;
      }else {
        return null;
      }
    };

    if(!patient) {
      return null;
    }


    return (
        <div>
          <div style={{...style, "display": "flex", "flexDirection": "row"}}>
            <Typography variant='h5'>{patient.name}</Typography>
            <>{getIcon(patient.gender)}</>
          </div>
          <div style={style}>
            <Typography variant='body1'>ssn: {patient.ssn}</Typography> 
            <Typography variant='body1'>occupation: {patient.occupation}</Typography> 
          </div>
          <div style={style}>
            <Typography variant='h6'>entries</Typography>
          </div>
          {(patient.entries && patient.entries.length > 0) ? 
          <div style={style}>
            {patient.entries.map(entry => 
                 <div key={entry.id}>
                  <EntryDetails  entry={entry}/>
                </div>
            )}
          </div>: 
          <p>No entries</p>}
          <div style={style}>
            <Button variant="contained" color="primary" onClick={() => console.log('yo')}>
              Add New Entry
            </Button>
          </div>
        </div>
    );
};

export default PatientPage;
