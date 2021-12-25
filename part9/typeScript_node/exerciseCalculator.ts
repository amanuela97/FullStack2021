interface Result{
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}


export const calculateExercises  = (dailyExercises: Array<number>, target: number): Result => {
    const periodLength = dailyExercises.length;
    const trainingDays = dailyExercises.filter(exercise => exercise > 0).length;
    const sum = dailyExercises.reduce((a,b) => a + b, 0);
    const avg = sum / periodLength;
    const success =  avg >= target;
    let rating: number;
    let ratingDescription: string;

    if(avg >= target) {
        rating = 3;
        ratingDescription = 'Great job! target was reached';
    }else if ((target - avg ) <= 0.5 ){
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }else {
        rating = 1;
        ratingDescription = 'target was not close! more effort could be put';
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average: avg,
    };
};
/*const target: number = Number(process.argv[2])
const dailyExercises: Array<number> = []

for(let i = 3; i < process.argv.length; i++){
    dailyExercises.push(Number(process.argv[i]))
}

try {
    console.log(target)
    console.log(calculateExercises(dailyExercises, target))  
} catch (error: unknown) {
    let errorMessage = 'An error has occured.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}*/