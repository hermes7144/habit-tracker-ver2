import React, { useState } from 'react';
import useHabits from '../hooks/useHabits';

type HabitType = {
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

export default function NewHabitPage() {
  const { addOrUpdateItem } = useHabits();
  const [habit, setHabit] = useState<HabitType>(initialHabit);
  const [success, setSuccess] = useState('');

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
    addOrUpdateItem.mutate(habit, {
      onSuccess: () => {
        setSuccess('성공적으로 습관이 추가되었습니다.');
        setTimeout(() => {
          setSuccess(null);
        }, 2000);
      },
    });
  };

  return (
    <div className='flex content-center items-center justify-center h-full py-40 flex-col'>
      {success && <p className='my-2'>✔️{success}</p>}
      <div className='w-full lg:w-4/12 px-4'>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
          <div className='rounded-t mb-0 px-6 py-6'>
            <div className='text-center mb-3'>
              <h6 className='text-blueGray-500 text-sm font-bold'>Create New Habit</h6>
            </div>
            <hr className='mt-6 border-b-1 border-blueGray-300' />
          </div>
          <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
            <form onSubmit={handleSubmit}>
              <div className='relative w-full mb-3'>
                <input type='text' className='w-full' name='title' value={habit.title} onChange={handleChange} placeholder='Habit Name' />
              </div>

              <div className='relative w-full mb-3'>
                <input type='text' className='w-full' name='description' value={habit.description} onChange={handleChange} placeholder='Description' />
              </div>
              <div>
                <label className='inline-flex items-center cursor-pointer'>
                  <span className='ml-2 text-sm font-semibold text-blueGray-600'>Frequency</span>
                </label>

                <div className='flex justify-around'>
                  {frequencies.map((frequency, index) => (
                    <div id={frequency} key={index} className='flex flex-col items-center'>
                      <input type='checkbox' name={String(index)} onChange={handleChange} />
                      <label htmlFor={String(index)}>{frequency}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className='text-center mt-6'>
                <button className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150' type='submit'>
                  Create New Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { HabitType };
