import React from 'react';
import Person from './Person'
import personService from '../services/persons'

const Persons = ({persons, deletePersonHandler}) => {
    return ( 
        <div>
            {
                persons.map(person => {
                    return (
                        <Person 
                            deletePersonHandler={deletePersonHandler} 
                            key={person.name} 
                            person={person} 
                        />
                    )
                })
            }

        </div>
       
     );
}
 
export default Persons;