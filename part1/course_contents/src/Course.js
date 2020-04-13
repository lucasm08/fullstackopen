import React from 'react';
import Header from './Header';
import Content from './Content'

const Course = ({course}) => {
    const total = course.parts.reduce((s, p) => {
        return s + p.exercises;
    }, 0)
    return ( 
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <h4>total of {total} exercices</h4>
        </div>
     );
}
 
export default Course;