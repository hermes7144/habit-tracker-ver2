import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailAchievement from '../DetailAchievement';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import { mockToday } from '../../tests/mockHabits';

describe('DetailAchievement', () => {
  // Fixing the values related to moment()
  const today = moment(mockToday);
  const dayOfWeek = (moment(mockToday).day() + 6) % 7;
  const startOfWeek = moment(mockToday).startOf('week');

  // Assigning the fixed values to the variables
  global.today = today;
  global.dayOfWeek = dayOfWeek;
  global.startOfWeek = startOfWeek;

  const habit = {
    createdAt: mockToday,
    frequency: [1, 2, 3, 4, 5],
  };
  const totalDates = ['2023-06-19', '2023-06-20', '2023-06-21', '2023-06-22', '2023-06-23', '2023-06-24', '2023-06-25'];
  const checkDates = ['2023-06-19', '2023-06-20', '2023-06-21'];

  it('renders performance charts correctly', () => {
    renderDetailAchieveMent();
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('60.0%')).toBeInTheDocument();
    expect(screen.getByText('33.3%')).toBeInTheDocument();
  });

  function renderDetailAchieveMent() {
    return render(withAllContexts(withRouter(<Route path='/' element={<DetailAchievement habit={habit} totalDates={totalDates} checkDates={checkDates} />} />)));
  }
});
