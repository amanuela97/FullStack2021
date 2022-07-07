import React from 'react';
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { Card, CardContent } from '@material-ui/core';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdLocalHospital } from 'react-icons/md';
import { style } from '../constants';
import { useStateValue } from '../state';

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const getColor = (
    rating: HealthCheckRating
  ): 'green' | 'yellow' | 'orange' | 'red' => {
    switch (rating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return 'green';
    }
  };

  return (
    <div style={style}>
      <Card variant="outlined">
        <CardContent>
          <p>{entry.date}</p>
          <MdLocalHospital />
          <p>{entry.description}</p>
          <AiOutlineHeart color={getColor(entry.healthCheckRating)} />
          {entry.diagnosisCodes &&
            entry.diagnosisCodes.length > 0 &&
            diagnoses && (
              <ul>
                {entry.diagnosisCodes.map((code) => (
                  <li key={code}>
                    {code}: {diagnoses[code].name}
                  </li>
                ))}
              </ul>
            )}
          <p>diagnosed by {entry.specialist}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthCheck;
