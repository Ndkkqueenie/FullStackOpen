import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (newName.trim() === '') {
      return;
    }
  
    const isDuplicate = persons.some((person) => person.name === newName);
    if (isDuplicate) {
      alert(`${newName} is already added to the phonebook.`);
      return;
    }
  
    const newPerson = { name: newName };
    setPersons([...persons, newPerson]);
    setNewName('');
  };
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
