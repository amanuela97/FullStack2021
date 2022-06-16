import { useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';
import { useStateValue } from '../state';
import { Typography} from "@material-ui/core";
import { BiMaleSign, BiFemaleSign } from 'react-icons/bi';
import { FaGenderless } from 'react-icons/fa';
import { setPatient } from "../state/reducer";

const PatientPage = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const style = {"marginTop": "15px"};


    useEffect(() => {
        const fetchPatient = async () => {
            try {
              const { data: patientFromApi } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id!}`
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




    return (
        <div>
          <div style={{...style, "display": "flex", "flexDirection": "row"}}>
            <Typography variant='h5'>{patient?.name}</Typography>
            <>{getIcon(patient?.gender)}</>
          </div>
          <div style={style}>
            <Typography variant='body1'>ssn: {patient?.ssn}</Typography> 
            <Typography variant='body1'>occupation: {patient?.occupation}</Typography> 
          </div>
          <div style={style}>
            <Typography variant='h6'>entries</Typography>
          </div>
          <div style={style}>
            {patient?.entries.map(entry => 
                <div key={entry.id}>
                    <Typography variant='body1'>{entry?.date} {entry?.description}</Typography>
                    <div style={{...style, "marginLeft": "20px"}}>
                      <ul>
                        {entry?.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}
                      </ul>
                    </div> 
                </div>
            )}
          </div>
        </div>
    );
};

export default PatientPage;
