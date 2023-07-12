import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders the "Notes" header', () => {
  const notes = [
    { id: 1, content: 'First note' },
    { id: 2, content: 'Second note' },
  ];
  const { getByText } = render(<App notes={notes} />);
  const headerElement = getByText('Notes');
  expect(headerElement).toBeInTheDocument();
});

test('renders all notes', () => {
  const notes = [
    { id: 1, content: 'First note' },
    { id: 2, content: 'Second note' },
  ];
  const { getByText } = render(<App notes={notes} />);
  const note1Element = getByText('First note');
  const note2Element = getByText('Second note');
  expect(note1Element).toBeInTheDocument();
  expect(note2Element).toBeInTheDocument();
});
