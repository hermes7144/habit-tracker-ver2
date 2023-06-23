import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { mockHabits, mockWeek } from '../../tests/mockHabits';
import { mockCheckmarks } from '../../tests/mockCheckmarks';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import BarChart from '../BarChart';
import 'canvas-mock';

describe('BarChart', () => {
  const fakeUseHabits = jest.fn();

  beforeEach(() => {
    fakeUseHabits.mockImplementation(() => {
      return {
        habitsQuery: { data: mockHabits },
        checksQuery: { data: mockCheckmarks },
      };
    });
  });

  afterEach(() => fakeUseHabits.mockReset());

  it('renders bar chart correctly', async () => {
    renderBarChart();
    // Wait for the chart to be rendered
    await waitFor(() => {
      const canvasElement = screen.getByRole('img');
      expect(canvasElement).toBeInTheDocument();
    });
  });
  function renderBarChart() {
    return render(withAllContexts(withRouter(<Route path='/' element={<BarChart week={mockWeek} />} />), fakeUseHabits));
  }
});
