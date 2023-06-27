import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailAchievement from '../DetailAchievement';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import { mockCheckDates, mockHabit, mockToday, mockTotalDates } from '../../tests/mockHabits';
import MockDate from 'mockdate';

describe('DetailAchievement', () => {
  beforeEach(() => {
    MockDate.set(mockToday);
  });
  it('renders performance charts correctly', () => {
    renderDetailAchieveMent();
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('60.0%')).toBeInTheDocument();
    expect(screen.getByText('30.0%')).toBeInTheDocument();
  });

  function renderDetailAchieveMent() {
    return render(withAllContexts(withRouter(<Route path='/' element={<DetailAchievement habit={mockHabit} totalDates={mockTotalDates} checkDates={mockCheckDates} />} />)));
  }
});
