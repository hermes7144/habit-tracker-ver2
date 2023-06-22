import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';
import CalendarCard from '../CalendarCard';

describe('CalendarCard', () => {
  const value = new Date('2023-06-22');
  const week = ['2023-06-19', '2023-06-20', '2023-06-21', '2023-06-22', '2023-06-23', '2023-06-24', '2023-06-25'];
  const onChange = jest.fn();

  it('renders calendar correctly', () => {
    render(<CalendarCard value={value} onChange={onChange} week={week} />);

    // Assert the presence of the calendar component
    const calendarComponent = screen.getByText('June 2023');
    expect(calendarComponent).toBeInTheDocument();
  });
});
