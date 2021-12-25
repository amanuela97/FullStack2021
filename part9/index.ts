import express from 'express'
import { calculateBmi } from './bmiCalculator'
const app = express()
const PORT= 3001

app.get('/hello', (_req,res) => {
    res.json('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {

    const height: number = Number(req.query.height)
    const weight: number = Number(req.query.weight)
    if(!height || isNaN(height) || !weight || isNaN(weight)){
        res.status(400).send({
            error: 'malformatted parameters'
        })
    } 
    const result = calculateBmi(height,weight)
    res.json(result)
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})