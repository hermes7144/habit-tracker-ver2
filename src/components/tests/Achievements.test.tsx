import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';
import 'moment/locale/fr';
import Achievements from '../Achievements';
import { mockHabits, mockToday } from '../../tests/mockHabits';
import { mockCheckmarks } from '../../tests/mockCheckmarks';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import MockDate from 'mockdate';

describe('Achievements', () => {
  const fakeUseHabits = jest.fn();

  beforeEach(() => {
    MockDate.set(mockToday);
    console.log(new Date());

    fakeUseHabits.mockImplementation(() => {
      return {
        habitsQuery: { data: mockHabits },
        checksQuery: { data: mockCheckmarks },
      };
    });
  });

  afterEach(() => {
    fakeUseHabits.mockReset();
    jest.restoreAllMocks();
  });

  it('renders performance charts correctly', () => {
    renderAchieveMents();

    // Assert the presence of performance chart completion rates
    expect(screen.getByText('33.3%')).toBeInTheDocument();
    expect(screen.getByText('50.0%')).toBeInTheDocument();
    expect(screen.getByText('100.0%')).toBeInTheDocument();
  });

  function renderAchieveMents() {
    return render(withAllContexts(withRouter(<Route path='/' element={<Achievements />} />), fakeUseHabits));
  }
});
