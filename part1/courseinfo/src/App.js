import React from 'react'

const Header = ({course: {name}}) => {
  return (
    <h1>{name}</h1>
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
      {parts.map(part => 
      <Part 
        part={part.name}
        exercise={part.exercises}
      />
      )
      }
    </div>
  )
}

const Total = ({course: {parts}}) => {
  let total = 0;
  parts.forEach((part) => total+= part.exercises);

  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App