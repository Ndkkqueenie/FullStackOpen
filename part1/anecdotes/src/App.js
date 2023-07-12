import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const randomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const voteAnecdote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  const maxVotesIndex = votes.indexOf(Math.max(...votes));
  const anecdoteHasMaxVotes = anecdotes[maxVotesIndex];

  return (
    <div>
      <h1> Anecdotes of Software Engineering</h1>
      <div>
        <div>
          <h2>Anecdote of the Day</h2>
          <p>{anecdotes[selected]}</p>
          <p>Votes: {votes[selected]}</p>
          <button onClick={voteAnecdote}>Vote</button>
          <button onClick={randomAnecdote}>Next Anecdote</button>
        </div>
        <div>
          <h2>Anecdote with the Most Votes</h2>
          <p>{anecdoteHasMaxVotes}</p>
          <p>Has Votes: {votes[maxVotesIndex]}</p>
        </div>
      </div>
    </div>
  )
}

export default App
