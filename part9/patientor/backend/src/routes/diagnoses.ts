import express from 'express';
// import diaryService from '../services/patientServices';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Fetching all diaries!');
  // res.send(diaryService.getNonSensitiveEntries());

});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
