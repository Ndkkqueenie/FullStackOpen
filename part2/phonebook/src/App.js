import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import SearchField from './components/SearchField';
import NumbersList from './components/NumbersList';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const hookEffect = () => {
    console.log('Effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hookEffect, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newName.trim() === '' || newNumber.trim() === '') {
      return;
    }

    const isDuplicate = persons.some(
      (person) => person.name === newName || person.number === newNumber
    );
    if (isDuplicate) {
      alert(`${newName} or ${newNumber} is already added to the phonebook.`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
  };

  const filteredPeople = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <SearchField searchName={searchName} handleSearchChange={handleSearchChange} />
      </div>
      <div>
        <h2>Add a New Number</h2>
        <Form
          handleSubmit={handleSubmit}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <div>
        <h2>Numbers</h2>
        <NumbersList persons={filteredPeople} />
      </div> 
    </div>
  );
};

export default App;
