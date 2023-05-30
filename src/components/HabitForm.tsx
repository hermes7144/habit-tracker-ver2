import React, { useState } from 'react';
import useHabits from '../hooks/useHabits';
import { AiOutlineClose } from 'react-icons/ai';
import ButtonFull from './ui/ButtonFull';

export type HabitType = {
  id?: string;
  title?: string;
  description?: string;
  frequency: string[];
};

// Initial habit
const initialHabit = {
  title: '',
  description: '',
  frequency: [],
};
const frequencies = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function HabitForm({ closeModal, habitProp }: { closeModal: any; habitProp: any | null }) {
  console.log(habitProp);

  const { addOrUpdateItem } = useHabits();
  const [habit, setHabit] = useState<HabitType>(habitProp || initialHabit);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const frequency = habit.frequency.includes(name) ? habit.frequency.filter((v) => v !== name) : [...habit.frequency, name];
      setHabit({ ...habit, frequency });
    } else {
      setHabit({ ...habit, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!habit.frequency.length) {
      alert('최소 하나의 요일을 체크해주세요');
      return;
    }
    addOrUpdateItem.mutate(habit, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return (
    <div className='flex content-center items-center justify-center h-full py-40 flex-col'>
      <div className='flex w-full justify-end'>
        <AiOutlineClose className='text-2xl' onClick={closeModal} />
      </div>
      <div className=' w-[500px] px-4'>
        <div className='relative flex flex-col min-w-0 break-words mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
          <div className='rounded-t mb-0 px-6 py-6'>
            <div className='text-center mb-3'>
              <h6 className='text-blueGray-500 text-sm font-bold'>{habitProp ? 'Manage Habit' : 'Create new Habit'}</h6>
            </div>
            <hr className='mt-6 border-b-1 border-blueGray-300' />
          </div>
          <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
            <form onSubmit={handleSubmit}>
              <input type='text' className='w-full mb-3' id='title' name='title' value={habit?.title} onChange={handleChange} placeholder='Habit Name' required />

              <input type='text' className='w-full mb-3' name='description' value={habit?.description} onChange={handleChange} placeholder='Description' />

              <span className='ml-2 text-sm font-semibold text-blueGray-600'>Frequency</span>

              <div className='flex justify-around mb-5'>
                {frequencies.map((frequency, index) => {
                  const isChecked = habit?.frequency.includes(String(index));
                  return (
                    <div id={frequency} key={index} className='flex flex-col items-center'>
                      <input type='checkbox' id={String(index)} name={String(index)} checked={isChecked} onChange={handleChange} />
                      <label htmlFor={String(index)}>{frequency}</label>
                    </div>
                  );
                })}
              </div>
              <ButtonFull text={habitProp ? 'Update Habit' : 'Create Habit'} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// export type { HabitType };
