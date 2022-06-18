import React from 'react';
import { Card , CardContent} from "@material-ui/core";
import { HospitalEntry } from '../types';
import { FaHospitalSymbol } from 'react-icons/fa';
import { style } from '../constants';
import { useStateValue } from '../state';


const Hospital: React.FC<{entry: HospitalEntry}>  = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <div style={style}>
           <Card variant="outlined">
            <CardContent>
                <p>{entry.date}</p>
                <FaHospitalSymbol/>
                <p>{entry.description}</p>
                <p><b>discharger date:</b> {entry.discharge.date}</p>
                <p><b>discharger criteria:</b> {entry.discharge.criteria}</p>
                {(entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && diagnoses) &&
                <ul>
                    {entry.diagnosisCodes.map(code => 
                    <li key={code}>{code}: {diagnoses[code].name}</li>)
                    }
                </ul>
                 }
                <p>diagnosed by {entry.specialist}</p>
            </CardContent>                 
            </Card> 
        </div>
    );
};

export default Hospital;
