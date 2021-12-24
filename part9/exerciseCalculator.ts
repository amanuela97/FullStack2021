interface Result{
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}


const calculateExercises  = (dailyExercises: Array<number>, target: number): Result => {
    const periodLength = dailyExercises.length
    const trainingDays = dailyExercises.filter(exercise => exercise !== 0).length
    const sum = dailyExercises.reduce((a,b) => a + b, 0)
    const avg = sum / periodLength
    const success =  avg >= target
    let rating: number
    let ratingDescription: string

    if(avg >= target) {
        rating = 3 
        ratingDescription = 'Great job! target was reached'
    }else if ((target - avg ) <= 0.5 ){
        rating = 2
        ratingDescription = 'not too bad but could be better'
    }else {
        rating = 1
        ratingDescription = 'target was not close! more effort is needed'
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average: avg,
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))