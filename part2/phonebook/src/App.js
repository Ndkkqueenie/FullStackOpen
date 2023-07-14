import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Form from './components/Form';
import SearchField from './components/SearchField';
import NumbersList from './components/NumbersList';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        // Handle error here
        console.log('Error fetching data:', error);
      });
  }, []); // Dependency array: Only re-run the effect if persons state changes

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
  
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            // Handle error here
            console.log('Error updating person:', error);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          // Handle error here
          console.log('Error creating person:', error);
        });
    }
  };  

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`);
    
    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(error => {
          // Handle error here
          console.log('Error deleting person:', error);
        });
    }
  };  

  const filteredPersons = persons.filter((person) =>
    person.name && person.name.toLowerCase().includes(searchName.toLowerCase())
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
        <NumbersList persons={filteredPersons} handleDelete={handleDelete} />
      </div> 
    </div>
  );
};

export default App;
