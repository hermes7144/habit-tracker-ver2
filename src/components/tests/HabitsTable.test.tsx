import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import { render, screen } from '@testing-library/react';
import HabitsTable from '../HabitsTable';
import { mockHabits as habits, mockToday, mockWeek as week } from '../../tests/mockHabits';
import { mockCheckmarks as checkmarks } from '../../tests/mockCheckmarks';
import userEvent from '@testing-library/user-event';
import MockDate from 'mockdate';

describe('HabitsTable', () => {
  const fakeUseHabits = jest.fn();
  const addOrUpdateCheckItem = jest.fn();
  const removeCheckItem = jest.fn();

  beforeEach(() => {
    MockDate.set(mockToday);
    fakeUseHabits.mockImplementation(() => {
      return {
        habitsQuery: { data: habits },
        checksQuery: { data: checkmarks },
        addOrUpdateCheckItem: { mutate: addOrUpdateCheckItem },
        removeCheckItem: { mutate: removeCheckItem },
      };
    });
  });

  afterEach(() => fakeUseHabits.mockReset());

  it('renders habit titles and dates', () => {
    renderHabitsTable();

    const habit1Title = screen.getByText('Habit 1');
    expect(habit1Title).toBeInTheDocument();

    week.forEach((day) => {
      const temp = day.slice(5);
      expect(screen.getByText(temp)).toBeInTheDocument();
    });
  });

  it('navigates to habit details page when habit title is clicked', async () => {
    function LocationStateDisplay() {
      return <pre>{habits[0].id}</pre>;
    }

    render(
      withAllContexts(
        withRouter(
          <>
            <Route path='/' element={<HabitsTable week={week} filter={'all'} />} />
            <Route path={`/habits/1`} element={<LocationStateDisplay />} />
          </>
        ),
        fakeUseHabits
      )
    );

    const habit1Title = screen.getByText('Habit 1');
    await userEvent.click(habit1Title);

    expect(screen.getByText(habits[0].id)).toBeInTheDocument();
  });

  it('calls addOrUpdateCheckItem.mutate when a checkbox is checked', () => {
    renderHabitsTable();
    const checkbox = screen.getByTestId(`${habits[0].id}-${week[0]}`);

    userEvent.click(checkbox);
    expect(addOrUpdateCheckItem).toBeCalled();
  });

  it('calls removeCheckItem.mutate when a checkbox is unchecked', async () => {
    renderHabitsTable();
    const checkbox = screen.getByTestId(`${habits[1].id}-${week[0]}`);
    userEvent.click(checkbox);
    userEvent.click(checkbox);

    expect(removeCheckItem).toBeCalled();
  });

  function renderHabitsTable() {
    return render(withAllContexts(withRouter(<Route path='/' element={<HabitsTable week={week} filter={'all'} />} />), fakeUseHabits));
  }
});
