import express from 'express';
import patientService from '../services/patientServices';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());

});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const entry = patientService.getEntryById(id);
  if(entry) {
    res.status(200).send(entry);
  }else {
    res.status(404).send(`Patient with ${id} was not found`);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addDiary(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
