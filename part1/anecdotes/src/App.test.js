import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('increments vote count for the selected anecdote when "Vote" button is clicked', () => {
  const { getByRole, queryByText } = render(<App />);
  const voteButton = getByRole('button', { name: 'Vote' });
  const voteCountElement = queryByText(/Votes: \d+/);

  fireEvent.click(voteButton);
  fireEvent.click(voteButton);

  expect(voteCountElement.textContent).toMatch(/Votes: 2/);
});

test('displays a random anecdote when "Next Anecdote" button is clicked', () => {
  const { getByRole, queryByText } = render(<App />);
  const randomButton = getByRole('button', { name: 'Next Anecdote' });

  fireEvent.click(randomButton);

  expect(queryByText(/If it hurts, do it more often\./)).toBeInTheDocument();
});

test('displays the anecdote with the most votes', () => {
  const { getByText } = render(<App />);
  const maxVotesAnecdoteElement = getByText('Anecdote with the Most Votes');

  expect(maxVotesAnecdoteElement).toBeInTheDocument();
});
