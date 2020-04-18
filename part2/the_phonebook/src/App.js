import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch] = useState('')

  useEffect(() => {
    personService.getAll()
    .then(persons =>
        setPersons(persons)
    )
  }, [])

  let filterResult = search.length
    ? persons.filter(
        person => (
          person.name.toLowerCase().includes(search.toLowerCase())
        )
      ) 
    : persons
  
  const handlFilter = (event) => {
    setSearch(event.target.value)
    filterResult = persons.filter(
      person => (
        person.name.toLowerCase().includes(search.toLowerCase())
        )
      )
  }

  const deletePersonHandler = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) { 
        personService.deletePerson(person.id)
        .then(data => {
            setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
            alert(
              `${person.name} was already deleted from server`
            )
        })
    }
  }


  const handleAddNewName = (event) => {
    event.preventDefault()
    const exist = persons.find(person => {
      return person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    })
    if(exist) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
     const newNameObj =  {
       name: newName,
       number: newNumber
     }

     personService.newPerson(newNameObj)
     .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        if(returnedPerson.name.toLowerCase().includes(search.toLowerCase())){
          filterResult.push(returnedPerson)
        }

     })
     
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <Filter handlFilter={handlFilter} search={search} />
      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleAddNewName={handleAddNewName}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={filterResult}
        deletePersonHandler={deletePersonHandler}

      />
    </div>
  )
}

export default App