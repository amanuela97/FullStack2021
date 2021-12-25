interface Response {
    weight: number,
    height: number,
    bmi: string
}


export const calculateBmi = (height: number, weight: number): Response => {
    const bmi = Number((weight / Math.pow((height / 100),2)).toFixed(1))
    let result: string = ''
    if(bmi < 18.5) {
        result = `Underweight (${height} ${weight})`
    }else if(bmi >= 18.5 && bmi < 25){
        result = `Normal (${height} ${weight})`
    }else if(bmi >= 25 && bmi < 30){
        result = `Overweight (${height} ${weight})` 
    }else if(bmi >= 30 && bmi < 35){
        result = `Obesity class 1 (${height} ${weight})` 
    }else if(bmi >= 35 && bmi <= 40){
        result = `Obesity class 2 (${height} ${weight})` 
    }else {
        result = `Obesity class 3 (${height} ${weight})` 
    }
    return {
        weight,
        height,
        bmi: result
    }
}


//console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])))