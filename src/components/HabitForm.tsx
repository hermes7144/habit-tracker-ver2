import React, { useState } from 'react';
import useHabits from '../hooks/useHabits';
import { AiOutlineClose } from 'react-icons/ai';

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
        <div className='relative flex flex-col min-w-0 break-words  mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
          <div className='rounded-t mb-0 px-6 py-6'>
            <div className='text-center mb-3'>
              <h6 className='text-blueGray-500 text-sm font-bold'>Manage Habit</h6>
            </div>
            <hr className='mt-6 border-b-1 border-blueGray-300' />
          </div>
          <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
            <form onSubmit={handleSubmit}>
              <div className='relative w-full mb-3'>
                <input type='text' className='w-full' name='title' value={habit?.title} onChange={handleChange} placeholder='Habit Name' />
              </div>

              <div className='relative w-full mb-3'>
                <input type='text' className='w-full' name='description' value={habit?.description} onChange={handleChange} placeholder='Description' />
              </div>
              <div>
                <span className='ml-2 text-sm font-semibold text-blueGray-600'>Frequency</span>

                <div className='flex justify-around'>
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
              </div>

              <div className='text-center mt-6'>
                <button className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150' type='submit'>
                  {/* Create New Habit */}Update Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// export type { HabitType };
