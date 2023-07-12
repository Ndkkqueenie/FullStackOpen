import React from 'react';

const Course = ({ course }) => {
  const Header = () => {
    return <h2>{course.name}</h2>;
  };

  const Content = () => {
    return (
      <div>
        {course.parts.map((part) => (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        ))}
      </div>
    );
  };

  const Total = () => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

    return <h4>Total Number of Exercises {totalExercises}</h4>;
  };

  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  );
};

export default Course;

