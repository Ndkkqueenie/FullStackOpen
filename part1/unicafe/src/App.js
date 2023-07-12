import React, { useState } from 'react';

const FeedbackButton = ({ text, dataTestId, handleClick }) => {
  return <button onClick={handleClick} data-testid={dataTestId}>{text}</button>;
};

const Statistics = ({ feedback }) => {
  const { good, neutral, bad } = feedback;
  const total = good + neutral + bad;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  const average = (good - bad) / total;
  const positivePercentage = (good / total) * 100;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Good:</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutral:</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>Bad:</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>Total:</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>Average:</td>
            <td>{average.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Positive:</td>
            <td>{positivePercentage.toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  return (
    <div>
      <h1>Student Feedback</h1>
      <FeedbackButton text="Good" dataTestId="good-count" handleClick={() => handleFeedback('good')} />
      <FeedbackButton text="Neutral" dataTestId='neutral-count' handleClick={() => handleFeedback('neutral')} />
      <FeedbackButton text="Bad" handleClick={() => handleFeedback('bad')} />
      <h2>Statistics</h2>
      <Statistics feedback={feedback} />
    </div>
  );
};

export default App;
