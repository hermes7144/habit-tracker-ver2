import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { mockHabits } from '../../tests/mockHabits';
import { mockCheckmarks } from '../../tests/mockCheckmarks';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import LineChart from '../LineChart';

describe('LineChart', () => {
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

  it('renders line chart correctly', async () => {
    renderLineChart();
    // Wait for the chart to be rendered
    await waitFor(() => {
      const canvasElement = screen.getByRole('img');
      expect(canvasElement).toBeInTheDocument();
    });
  });
  function renderLineChart() {
    return render(withAllContexts(withRouter(<Route path='/' element={<LineChart labels={['2023-06-01', '2023-06-02']} data={[1.01, 1.0201]} />} />), fakeUseHabits));
  }
});
