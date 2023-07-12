import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

describe('App', () => {
  test('renders student feedback heading', () => {
    const { getByText } = render(<App />);
    const headingElement = getByText('Student Feedback');
    expect(headingElement).toBeInTheDocument();
  });

  test('increments "good" feedback count when "Good" button is clicked', () => {
    const { getByText, getByTestId } = render(<App />);
    const goodButton = getByText('Good');
    const goodCountElement = getByTestId('good-count');

    fireEvent.click(goodButton);
    fireEvent.click(goodButton);

    expect(goodCountElement.textContent).toBe('Good');
  });

  test('increments "neutral" feedback count when "Neutral" button is clicked', () => {
    const { getByText, getByTestId } = render(<App />);
    const neutralButton = getByText('Neutral');
    const neutralCountElement = getByTestId('neutral-count');

    fireEvent.click(neutralButton);

    expect(neutralCountElement.textContent).toBe('1');
  });

  test('calculates and displays the average and total count', () => {
    const { getByText } = render(<App />);
    const goodButton = getByText('Good');
    const neutralButton = getByText('Neutral');
    const badButton = getByText('Bad');
    const averageElement = getComputedStyle('average');
    const totalCountElement = getComputedStyle('total-count');

    fireEvent.click(goodButton);
    fireEvent.click(goodButton);
    fireEvent.click(neutralButton);
    fireEvent.click(badButton);

    expect(averageElement.textContent).toBe('0.25');
    expect(totalCountElement.textContent).toBe('4');
  });

  test('displays "No feedback given" message when no feedback is provided', () => {
    const { getByText } = render(<App />);
    const noFeedbackElement = getByText('No feedback given');
    expect(noFeedbackElement).toBeInTheDocument();
  });
});