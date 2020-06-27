import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch] = useState('')
  const [ notification, setNotification]  = useState({
    message: null,
    type: null
  })

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
            notify({
              message: `deleted ${person.name} successfully!`,
              type: 'success'
            })
        })
        .catch(error => {
          notify({
            message: `${person.name} was already deleted from server`,
            type: 'error'
          })
        })
    }
  }

  const notify = (notification) => {
    setNotification({
      message: notification.message,
      type: notification.type
    })

    setTimeout(() => {
      setNotification({
        message: null,
        type: null,
      })
    }, 5000)
  }


  const handleAddNewName = (event) => {
    event.preventDefault()
    const exist = persons.find(person => {
      return person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    })

    const newNameObj =  {
      name: newName,
      number: newNumber
    }

    if(exist) {
      if(
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personService.updatePerson(newNameObj, exist.id)
        .then(returnedPerson => {
          setPersons(persons.map(person => {
            return person.id === returnedPerson.id ? returnedPerson : person
          }))
          notify({
            message: `Updadated ${returnedPerson.name}'s phone number successfully!`,
            type: 'success'
          })
        })
      }
      return;
    }

     personService.newPerson(newNameObj)
     .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        notify({
          message: `Added ${returnedPerson.name} successfully!`,
          type: 'success'
        })
        if(returnedPerson.name.toLowerCase().includes(search.toLowerCase())){
          filterResult.push(returnedPerson)
        }

     })
     .catch(error => {
        notify({
          message: error.response.data.error,
          type: 'error'
        })
     })
     
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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