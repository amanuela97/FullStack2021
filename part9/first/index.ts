import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
const PORT= 3001;

app.use(express.json());

app.get('/hello', (_req,res) => {
    res.status(200).json('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if(!height || isNaN(height) || !weight || isNaN(weight)){
        res.status(400).send({
            error: 'malformatted parameters'
        });
        return;
    } 
    const result = calculateBmi(height,weight);
    res.status(200).json(result);
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {daily_exercises,target} = req.body;

    if(!target || !daily_exercises){
        res.status(400).send({
            error: 'parameters missing'
        });
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if(isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some( (day: any) => typeof day !== 'number')){
        res.status(400).send({
            error: 'malformatted parameters'
        });
        return;
    }

    const dailyExercises = daily_exercises.map(day => Number(day));
    const targetNew =  Number(target);
    const result = calculateExercises(dailyExercises, targetNew);
    res.status(200).json(result);

});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
