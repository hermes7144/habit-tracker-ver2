import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HabitForm from '../HabitForm';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';

describe('HabitForm', () => {
  const fakeUseHabits = jest.fn();
  const addOrUpdateItemMock = jest.fn();

  beforeEach(() => {
    fakeUseHabits.mockImplementation(() => {
      return { addOrUpdateItem: { mutate: addOrUpdateItemMock } };
    });
  });

  afterEach(() => fakeUseHabits.mockReset());

  it('renders HabitForm component', () => {
    renderHabitForm();
    expect(screen.getByText('Create new Habit')).toBeInTheDocument();
  });

  it('renders HabitForm component with habitProp', () => {
    const habitProp = {
      title: 'Exercise',
      description: 'Daily exercise routine',
      frequency: [0, 1, 2],
    };

    renderHabitForm(habitProp);

    expect(screen.getByText('Manage Habit')).toBeInTheDocument();
  });

  it('updates habit title when input value changes', () => {
    renderHabitForm();
    const titleInput = screen.getByPlaceholderText('Habit Name');
    userEvent.type(titleInput, 'Exercise');
    expect(screen.getByDisplayValue('Exercise')).toBeInTheDocument();
  });

  it('updates habit description when input value changes', () => {
    renderHabitForm();
    const descriptionInput = screen.getByPlaceholderText('Description');
    userEvent.type(descriptionInput, 'Daily exercise routine');
    expect(screen.getByDisplayValue('Daily exercise routine')).toBeInTheDocument();
  });

  it('adds or removes frequency when checkbox is clicked', () => {
    renderHabitForm();
    const checkbox = screen.getByLabelText('MON');
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('displays alert if no frequency is selected on form submission', () => {
    renderHabitForm();
    window.alert = jest.fn();

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    expect(window.alert).toHaveBeenCalledWith('최소 하나의 요일을 체크해주세요');
  });

  it('calls addOrUpdateItem.mutate on form submission', () => {
    renderHabitForm();

    const titleInput = screen.getByPlaceholderText('Habit Name');
    userEvent.type(titleInput, 'Exercise');

    const checkbox = screen.getByLabelText('MON');
    userEvent.click(checkbox);

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    expect(addOrUpdateItemMock).toHaveBeenCalled();
  });

  function renderHabitForm(habitProp = null) {
    return render(withAllContexts(withRouter(<Route path='/' element={<HabitForm closeModal={() => {}} habitProp={habitProp} />} />), fakeUseHabits));
  }
});
