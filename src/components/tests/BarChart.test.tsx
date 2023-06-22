import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { mockHabits } from '../../tests/mockHabits';
import { mockCheckmarks } from '../../tests/mockCheckmarks';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import BarChart from '../BarChart';

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
  const week = ['2023-06-19', '2023-06-20', '2023-06-21', '2023-06-22', '2023-06-23', '2023-06-24', '2023-06-25'];

  it('renders bar chart correctly', async () => {
    renderBarChart();
    // Wait for the chart to be rendered
    await waitFor(() => {
      const canvasElement = screen.getByRole('img');
      expect(canvasElement).toBeInTheDocument();
    });
  });
  function renderBarChart() {
    return render(withAllContexts(withRouter(<Route path='/' element={<BarChart week={week} />} />), fakeUseHabits));
  }
});
