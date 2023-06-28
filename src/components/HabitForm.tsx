import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ButtonFull from './ui/ButtonFull';
import { HabitType } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useHabitsHooks } from '../context/HabitsContext';

const FREQUENCIES = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function HabitForm({ closeModal, habitProp }: { closeModal: any; habitProp: any | null }) {
  const { useHabits } = useHabitsHooks();
  const { addOrUpdateItem } = useHabits();

  const navigate = useNavigate();
  const [habit, setHabit] = useState<HabitType>(
    habitProp || {
      title: '',
      description: '',
      frequency: [],
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const index = Number(value); // 체크박스 값(인덱스)를 숫자로 변환
      if (checked) {
        setHabit((prevHabit) => ({ ...prevHabit, frequency: [...prevHabit.frequency, index] }));
      } else {
        setHabit((prevHabit) => ({ ...prevHabit, frequency: prevHabit.frequency.filter((freq) => freq !== index) }));
      }
    } else {
      setHabit((prevHabit) => ({ ...prevHabit, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (habit.frequency.length === 0) {
      alert('최소 하나의 요일을 체크해주세요');
      return;
    }
    addOrUpdateItem.mutate(habit, {
      onSuccess: () => {
        closeModal();
        navigate('/');
      },
    });
  };

  return (
    <div className='flex content-center items-center justify-center h-full py-40 flex-col'>
      <div className='flex w-full justify-end'>
        <AiOutlineClose className='text-2xl' onClick={closeModal} />
      </div>
      <div className=' w-[350px] md:w-[500px] px-4'>
        <div className='relative flex flex-col min-w-0 break-words shadow-lg rounded-lg bg-blueGray-200 border-0'>
          <div className='rounded-t mb-0 px-6'>
            <div className='text-center my-3'>
              <h6 className='text-blueGray-500 text-sm font-bold'>{habitProp ? 'Manage Habit' : 'Create new Habit'}</h6>
            </div>
            <hr className=' border-b-1 border-blueGray-300' />
          </div>
          <div className='flex-auto px-4 lg:px-10 pb-5'>
            <form onSubmit={handleSubmit}>
              <input type='text' className='w-full my-2' id='title' name='title' value={habit.title} onChange={handleChange} placeholder='Habit Name' required />
              <input type='text' className='w-full my-2' name='description' value={habit.description} onChange={handleChange} placeholder='Description' />

              <span className='ml-2 text-sm font-semibold text-blueGray-600'>Frequency</span>

              <div className='flex justify-around mb-3'>
                {FREQUENCIES.map((frequency, index) => {
                  const isChecked = habit?.frequency.includes(index);
                  return (
                    <div id={frequency} key={index} className='flex flex-col items-center'>
                      <input type='checkbox' id={String(index)} value={index} checked={isChecked} onChange={handleChange} />
                      <label htmlFor={String(index)}>{frequency}</label>
                    </div>
                  );
                })}
              </div>
              <div className='w-full'>
                <ButtonFull text={habitProp ? 'Update Habit' : 'Create Habit'} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
