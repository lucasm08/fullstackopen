import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({course}) => {
  return ( <h1>{course}</h1>)
}


const Part = ({part}) => {
  return (<p>
    {part.name} {part.exercices}
  </p>)
}

const Total = ({total}) => {
  return ( <p>Number of exercises {total}</p>)
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
      <Header course={course.name}/>

      {course.parts.map(part => {
        return (<Part part={part}/>)
      })}

      <Total total={course.parts.reduce((total, part) => {
        return total + part.exercises
      }, 0)}/>
     
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))