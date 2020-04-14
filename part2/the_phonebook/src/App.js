import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '1-480-6780714'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
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
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddNewName}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          number: <input onChange={(e) => { setNewNumber(e.target.value)}} value={newNumber} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => {
          return (<p key={person.name}>{person.name} {person.number}</p>)
        })
      }
    </div>
  )
}

export default App