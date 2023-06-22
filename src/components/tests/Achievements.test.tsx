import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';
import Achievements from '../Achievements';
import { mockHabits } from '../../tests/mockHabits';
import { mockCheckmarks } from '../../tests/mockCheckmarks';

// Mocking HabitContext
jest.mock('../../context/HabitContext', () => ({
  useHabitHooks: () => ({
    useHabits: () => ({
      habitsQuery: { data: mockHabits },
      checksQuery: { data: mockCheckmarks },
    }),
  }),
}));

describe('Achievements', () => {
  beforeEach(() => {
    // Fixing the values related to moment()
    const today = moment('2023-06-22');
    const dayOfWeek = (moment('2023-06-22').day() + 6) % 7;
    const startOfWeek = moment('2023-06-22').startOf('week');
    const beforeWeek = moment('2023-06-22').subtract(1, 'w').startOf('week');

    console.log('beforeWeek', beforeWeek);

    // Assigning the fixed values to the variables
    global.today = today;
    global.dayOfWeek = dayOfWeek;
    global.startOfWeek = startOfWeek;
    global.beforeWeek = beforeWeek;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders performance charts correctly', () => {
    render(<Achievements />);

    // Assert the presence of performance chart completion rates
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('33.3%')).toBeInTheDocument();
    expect(screen.getByText('50.0%')).toBeInTheDocument();
  });
});
