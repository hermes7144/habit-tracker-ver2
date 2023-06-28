import React from 'react';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import HabitSetting from '../HabitSetting';
import { mockHabit } from '../../tests/mockHabits';
import moment from 'moment';
import 'moment/locale/fr';
import userEvent from '@testing-library/user-event';

describe('HabitSetting', () => {
  const fakeUseHabits = jest.fn();
  const addOrUpdateItem = jest.fn();
  const removeItem = jest.fn();

  beforeEach(() => {
    fakeUseHabits.mockImplementation(() => {
      return {
        addOrUpdateItem: { mutate: addOrUpdateItem },
        removeItem: { mutate: removeItem },
      };
    });
  });

  let confirmSpy;
  beforeEach(() => {
    confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));
  });
  afterEach(() => confirmSpy.mockRestore());

  afterEach(() => fakeUseHabits.mockReset());
  it('renders habit title, description, and start date', () => {
    renderHabitSetting();
    expect(screen.getByText(mockHabit.title)).toBeInTheDocument();
    expect(screen.getByText(mockHabit.description)).toBeInTheDocument();
    const startDateText = `시작일자: ${moment(mockHabit.createdAt).format('YYYY년 MM월 DD일')}(${moment().diff(moment(mockHabit.createdAt).format('YYYY-MM-DD'), 'days') + 1}일 째)`;
    expect(screen.getByText(startDateText)).toBeInTheDocument();
  });

  it('calls removeItem.mutate and navigate when delete button is clicked', () => {
    renderHabitSetting();

    const deleteButton = screen.getByLabelText('deleteButton');
    userEvent.click(deleteButton);
    expect(removeItem).toHaveBeenCalledWith(mockHabit.id);
    expect(window.location.pathname).toBe('/');
  });

  it('calls addOrUpdateItem.mutate, closeModal, and navigate when complete button is clicked', () => {
    renderHabitSetting();

    const completeButton = screen.getByText('습관 완료');
    userEvent.click(completeButton);
    expect(addOrUpdateItem).toHaveBeenCalledWith(
      { ...mockHabit, completed: !mockHabit.completed },
      expect.objectContaining({
        onSuccess: expect.any(Function),
      })
    );
    expect(addOrUpdateItem.mock.calls[0][1].onSuccess).toBeDefined();
    addOrUpdateItem.mock.calls[0][1].onSuccess();
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  function renderHabitSetting() {
    return render(withAllContexts(withRouter(<Route path='/' element={<HabitSetting habit={mockHabit} />} />), fakeUseHabits));
  }
});
