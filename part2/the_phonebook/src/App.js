import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
        setPersons(response.data)
    })

  }, [])

  let filterResult = search.length
    ? persons.filter(person => (person.name.toLowerCase().includes(search.toLowerCase()))) : persons
  
  const handlFilter = (event) => {
    setSearch(event.target.value)
    filterResult = persons.filter(person => (person.name.toLowerCase().includes(search.toLowerCase())))
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
     setPersons(persons.concat(newNameObj))
     setNewName('')
     setNewNumber('')
     if(newNameObj.name.toLowerCase().includes(search.toLowerCase())){
       filterResult.push(newNameObj)
     }
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
      <Persons persons={filterResult} />
    </div>
  )
}

export default App