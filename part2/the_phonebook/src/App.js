import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

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
     if(newNameObj.name.toLowerCase().includes(search.toLowerCase())){
       filterResult.push(newNameObj)
     }
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input onChange={handlFilter} value={search} />
        </div>
      <h2>Add new</h2>
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
        filterResult.map(person => {
          return (<p key={person.name}>{person.name} {person.number}</p>)
        })
      }
    </div>
  )
}

export default App