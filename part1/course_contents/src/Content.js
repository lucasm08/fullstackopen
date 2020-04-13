import React from 'react';
import Part from './Part';

const Content = ({parts}) => {
    return (
        <div>
            {
                parts.map(part => {
                    return (
                        <Part key={part.id} name={part.name} exercices={part.exercices} />
                    )
                })
            }
        </div>
     );
}
 
export default Content;