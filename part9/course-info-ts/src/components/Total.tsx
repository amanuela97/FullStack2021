import { CourseProps } from '../types'


const Total = (props: CourseProps) => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    );
}

export default Total;
