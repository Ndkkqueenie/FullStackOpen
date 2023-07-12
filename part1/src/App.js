import React from 'react';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App
