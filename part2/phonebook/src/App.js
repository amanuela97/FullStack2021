import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')

  const handleSubmit = (e) =>{
      e.preventDefault()

      const exists = persons.filter( person => person.name === newName).length > 0
      if(exists) {
        window.alert(`${newName} is already added to phonebook`)
        return
      }

      const clone = persons.concat({name: newName, number: newNumber})
      setPersons(clone)
      setNewName('')
      setNewNumber('')
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const formHandlers = [
    newName,
    newNumber,
    handleSubmit, 
    handleNameChange,
    handleNumberChange
  ]

  const List = search.length > 0
  ? persons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  : persons;

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch}/>
      <h2>add new</h2>
      <PersonForm formHandlers={formHandlers}/>
      <h2>Numbers</h2>
      <Persons List={List}/>
    </div>
  )
}

export default App