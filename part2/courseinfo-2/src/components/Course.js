import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
}
    
const Part = ({part, exercise}) => {
    return (
      <p>{part} {exercise}</p>
    )
}
  
const Content = ({course: {parts}}) => {
    return(
      <div>
        {parts.map((part, id) =>
        <Part 
          key={id}  
          part={part.name}
          exercise={part.exercises}
        />
        )}
      </div>
    )
}

const Total = ({course: {parts}}) => {
  const total = parts.reduce((sum, p) => {
    return sum + p.exercises
  },0)

  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  )
}

const Course = ({ course }) => {
    return (
        <>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
        </>
    );
}

export default Course;