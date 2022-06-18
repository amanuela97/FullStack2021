import React from 'react';
import { Card, CardContent} from "@material-ui/core";
import { OccupationalHealthcareEntry } from '../types';
import { GiHealthNormal } from 'react-icons/gi';
import { style } from '../constants';
import { useStateValue } from '../state';



const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry}>  = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <div style={style}>
            <Card variant="outlined">
            <CardContent>
                <p>{entry.date}</p>
                <GiHealthNormal/>
                <p>{entry.employerName}</p>
                <p>{entry.description}</p>
                {entry?.sickLeave && 
                <p>sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
                }
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

export default OccupationalHealthcare;
