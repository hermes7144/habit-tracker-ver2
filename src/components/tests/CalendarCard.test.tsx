import React from 'react';
import { render, screen } from '@testing-library/react';
import CalendarCard from '../CalendarCard';
import { mockToday } from '../../tests/mockHabits';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';

describe('CalendarCard', () => {
  const onChange = jest.fn();

  it('renders calendar correctly', () => {
    renderCalendarCard();

    // Assert the presence of the calendar component
    const calendarComponent = screen.getByText('June 2023');
    expect(calendarComponent).toBeInTheDocument();
  });

  function renderCalendarCard() {
    return render(withAllContexts(withRouter(<Route path='/' element={<CalendarCard value={mockToday} onChange={onChange} tileClassName={() => {}} />} />)));
  }
});
