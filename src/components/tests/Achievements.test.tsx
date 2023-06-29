import React from 'react';
import { render, screen } from '@testing-library/react';
import Achievements from '../Achievements';
import { mockHabits as habits, mockToday } from '../../tests/mockHabits';
import { mockCheckmarks as checkmarks } from '../../tests/mockCheckmarks';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import MockDate from 'mockdate';

describe('Achievements', () => {
  const fakeUseHabits = jest.fn();

  beforeEach(() => {
    MockDate.set(mockToday);

    fakeUseHabits.mockImplementation(() => {
      return {
        habitsQuery: { data: habits },
        checksQuery: { data: checkmarks },
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
    expect(screen.getByText('66.7%')).toBeInTheDocument();
    expect(screen.getByText('50.0%')).toBeInTheDocument();
  });

  function renderAchieveMents() {
    return render(withAllContexts(withRouter(<Route path='/' element={<Achievements />} />), fakeUseHabits));
  }
});
