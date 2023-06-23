import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailAchievement from '../DetailAchievement';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import { mockCheckDates, mockHabit, mockToday, mockTotalDates } from '../../tests/mockHabits';

describe('DetailAchievement', () => {
  // Fixing the values related to moment()
  const today = moment(mockToday);
  const dayOfWeek = (moment(mockToday).day() + 6) % 7;
  const startOfWeek = moment(mockToday).startOf('week');

  // Assigning the fixed values to the variables
  global.today = today;
  global.dayOfWeek = dayOfWeek;
  global.startOfWeek = startOfWeek;

  it('renders performance charts correctly', () => {
    renderDetailAchieveMent();
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('60.0%')).toBeInTheDocument();
    expect(screen.getByText('33.3%')).toBeInTheDocument();
  });

  function renderDetailAchieveMent() {
    return render(withAllContexts(withRouter(<Route path='/' element={<DetailAchievement habit={mockHabit} totalDates={mockTotalDates} checkDates={mockCheckDates} />} />)));
  }
});
