import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import FrequencyChip from '../FrequencyChip';
import { render, screen } from '@testing-library/react';

const FREQUENCY = [0, 1, 3];

describe('FrequencyChip', () => {
  it('renders frequencyChip correctly', () => {
    renderFrequencyChip();

    expect(screen.getByText('M')).toHaveClass('bg-brand');
    expect(screen.getByText('W')).not.toHaveClass('bg-brand');
  });

  function renderFrequencyChip() {
    return render(withAllContexts(withRouter(<Route path='/' element={<FrequencyChip frequency={FREQUENCY} />} />)));
  }
});
