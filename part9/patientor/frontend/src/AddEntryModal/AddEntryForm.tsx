import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { HealthCheckRating, EntryTypes, FormEntry } from '../types';
import {
  DiagnosisSelection,
  SelectField,
  HealthCheckRatingOption,
  TextField,
  TypeOption,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state/state';

export type EntryFormValues = Omit<FormEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
];

const typeOptions: TypeOption[] = [
  { value: EntryTypes.HealthCheck, label: EntryTypes.HealthCheck },
  { value: EntryTypes.Hospital, label: EntryTypes.Hospital },
  {
    value: EntryTypes.OccupationalHealthcare,
    label: EntryTypes.OccupationalHealthcare,
  },
];

const dateIsValid = (dateVal: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateVal.match(regex) !== null) {
    return dateVal.match(regex) !== null;
  }

  const date = new Date(dateVal);

  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(dateVal);
};

const validation = (values: EntryFormValues) => {
  const requiredError = 'Field is required';
  const dateFormatError = 'Date format should be YYYY-MM-DD';
  const errors: { [field: string]: string } = {};

  if (!values.description) {
    errors.description = requiredError;
  }

  if (!values.date) {
    errors.date = requiredError;
  } else if (!dateIsValid(values.date)) {
    errors.date = dateFormatError;
  }

  if (!values.specialist) {
    errors.specialist = requiredError;
  }

  if (!values.diagnosisCodes || values.diagnosisCodes.length === 0) {
    errors.diagnosisCodes = requiredError;
  }

  if (values.type === EntryTypes.Hospital) {
    if (!values.dischargeCriteria) {
      errors.dischargeCriteria = requiredError;
    }
    if (!values.dischargeDate) {
      errors.dischargeDate = requiredError;
    } else if (!dateIsValid(values.dischargeDate)) {
      errors.dischargeDate = dateFormatError;
    }
  } else if (values.type === EntryTypes.OccupationalHealthcare) {
    if (!values.employerName) {
      errors.employerName = requiredError;
    }

    if (!values.sickLeaveStartDate) {
      errors.sickLeaveStartDate = requiredError;
    } else if (!dateIsValid(values.sickLeaveStartDate)) {
      errors.sickLeaveStartDate = dateFormatError;
    }

    if (!values.sickLeaveEndDate) {
      errors.sickLeaveEndDate = requiredError;
    } else if (!dateIsValid(values.sickLeaveEndDate)) {
      errors.sickLeaveEndDate = dateFormatError;
    }
  }
  return errors;
};

const formatValues = (values: EntryFormValues) => {
  const baseValues = {
    type: values.type,
    description: values.description,
    date: values.date,
    specialist: values.specialist,
    diagnosisCodes: values.diagnosisCodes,
  };
  switch (values.type) {
    case EntryTypes.HealthCheck:
      const healthCheckValues = {
        ...baseValues,
        healthCheckRating: values.healthCheckRating,
      };
      return healthCheckValues;
    case EntryTypes.Hospital:
      const HospitalValues = {
        ...baseValues,
        discharge: {
          date: values.dischargeDate,
          criteria: values.dischargeCriteria,
        },
      };
      return HospitalValues;
    case EntryTypes.OccupationalHealthcare:
      const OccupationalHealthcareValues = {
        ...baseValues,
        sickLeave: {
          startDate: values.sickLeaveStartDate,
          endDate: values.sickLeaveEndDate,
        },
        employerName: values.employerName,
      };
      return OccupationalHealthcareValues;
  }
};

const entryTypeFields = (entryType: EntryTypes) => {
  switch (entryType) {
    case EntryTypes.Hospital:
      return (
        <>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="dischargeDate"
            component={TextField}
          />
          <Field
            label="Discharge Criteria"
            placeholder="Discharge Criteria"
            name="dischargeCriteria"
            component={TextField}
          />
        </>
      );
    case EntryTypes.HealthCheck:
      return (
        <SelectField
          label="HealthCheckRating"
          name="healthCheckRating"
          options={healthCheckRatingOptions}
        />
      );
    case EntryTypes.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveStartDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveEndDate"
            component={TextField}
          />
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
        </>
      );
    default:
      return null;
  }
};

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: EntryTypes.HealthCheck,
        healthCheckRating: HealthCheckRating.LowRisk,
      }}
      onSubmit={(values) => onSubmit(formatValues(values))}
      enableReinitialize={true}
      validate={(values) => validation(values)}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label="Type" name="type" options={typeOptions} />
            {entryTypeFields(values.type)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
