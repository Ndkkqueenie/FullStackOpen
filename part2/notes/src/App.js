import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  const hookEffect = () => {
    console.log('effect')
    axios
      .get('http://localhost:3005/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  };
  
  useEffect(hookEffect, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
  
    axios
    .post('http://localhost:3005/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
  };

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />  
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
};

export default App
