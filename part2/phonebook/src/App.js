import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import { deletePerson, createPerson, getAll, update } from './services/person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    state: false
  });

  const setDefaultError = () => {
    setTimeout(() => {
      setErrorMessage({...errorMessage, message: null});
    }, 4000);
  }

  const handleSubmit = (e) =>{
      e.preventDefault()

      const exists = persons.filter( p => p.name === newName).length > 0
      if(exists) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one ?`)){
          const personToUpdate = persons.find( p => p.name = newName)
          update(personToUpdate.id, {...personToUpdate, number: newNumber})
          .then(updatedPerson => {
            setPersons(persons.map(p => (p.name === newName ? updatedPerson : p)))
            setErrorMessage({
              message: `${updatedPerson.name}´s number was successfully updated`,
              state: false
            })
            setNewName('')
            setNewNumber('')
          }).catch(error => {
            console.log(error)
            setErrorMessage({
              message: 'update failed',
              state: true 
            })
          }).finally(() => setDefaultError())
        }
        return
      }

      const personObject = {
        name: newName,
        number: newNumber,

      }
      createPerson(personObject)
      .then(data => {
        setPersons(persons.concat(data))
        setErrorMessage({
          message: `Successfully Added ${personObject.name}`,
          state: false
        })
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        console.log(error);
        setErrorMessage({
          message: "Adding person failed",
          state: true
        })
      }).finally(() => setDefaultError())
  }

  const handleDelete = (name,id) => {
      if(window.confirm(`Delete ${name} ?`)){
        deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setErrorMessage({
            message: `${name} was successfully deleted`,
            state: false
          })
        }).catch(error => {
          console.log(error);
          setPersons(persons.filter(p => p.name !== name))
          setErrorMessage({
            message: `${name} has already been removed from the server :(`,
            state: true
          })
        }).finally(() => setDefaultError())
      }
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
    getAll().then(data => {
        setPersons(data)
      }).catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter search={search} handleSearch={handleSearch}/>
      <h2>add new</h2>
      <PersonForm formHandlers={formHandlers}/>
      <h2>Numbers</h2>
      <Persons List={List} handleDelete={handleDelete}/>
    </div>
  )
}

export default App