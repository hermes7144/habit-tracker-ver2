import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';
import 'moment/locale/fr';
import Achievements from '../Achievements';
import { mockHabits, mockToday } from '../../tests/mockHabits';
import { mockCheckmarks } from '../../tests/mockCheckmarks';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import 'canvas-mock';

describe('Achievements', () => {
  const fakeUseHabits = jest.fn();

  beforeEach(() => {
    fakeUseHabits.mockImplementation(() => {
      return {
        habitsQuery: { data: mockHabits },
        checksQuery: { data: mockCheckmarks },
      };
    });

    // Fixing the values related to moment()
    const today = moment(mockToday);
    const dayOfWeek = (moment(mockToday).day() + 6) % 7;
    const startOfWeek = moment(mockToday).startOf('week');
    const beforeWeek = moment(mockToday).subtract(1, 'w').startOf('week');

    // Assigning the fixed values to the variables
    global.today = today;
    global.dayOfWeek = dayOfWeek;
    global.startOfWeek = startOfWeek;
    global.beforeWeek = beforeWeek;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders performance charts correctly', () => {
    renderAchieveMents();

    // Assert the presence of performance chart completion rates
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('33.3%')).toBeInTheDocument();
    expect(screen.getByText('50.0%')).toBeInTheDocument();
  });

  function renderAchieveMents() {
    return render(withAllContexts(withRouter(<Route path='/' element={<Achievements />} />), fakeUseHabits));
  }
});
