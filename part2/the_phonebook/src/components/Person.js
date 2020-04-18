import React from 'react';

const Person = ({person, deletePersonHandler}) => {
    return ( 
        <p>
            {person.name}  
            {person.number}
            <button onClick={() => {deletePersonHandler(person)}}>delete</button>
        </p> 
    );
}
 
export default Person;