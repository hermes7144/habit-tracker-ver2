import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ButtonFull from './ui/ButtonFull';
import { HabitType } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useHabitsHooks } from '../context/HabitsContext';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const FREQUENCIES = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function HabitForm({ closeModal, habitProp }: { closeModal: any; habitProp: any | null }) {
  const { useHabits } = useHabitsHooks();
  const { addOrUpdateItem } = useHabits();
  const [time, setTime] = useState(habitProp?.limitTime || ''); // 초기 시간 설정
  const onChange = (newTime) => {
    setTime(newTime);
  };

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
      if (name) {
        setHabit((prevHabit) => ({ ...prevHabit, notTodo: checked }));
      } else {
        const index = Number(value); // 체크박스 값(인덱스)를 숫자로 변환
        if (checked) {
          setHabit((prevHabit) => ({ ...prevHabit, frequency: [...prevHabit.frequency, index] }));
        } else {
          setHabit((prevHabit) => ({ ...prevHabit, frequency: prevHabit.frequency.filter((freq) => freq !== index) }));
        }
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
    const habitSetting = { ...habit, limitTime: time };

    addOrUpdateItem.mutate(habitSetting, {
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
              <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                  <label className='text-blueGray-600 font-semibold'>Limit Time</label>
                  <div className='bg-white'>
                    <TimePicker clearAriaLabel='Clear value' clockAriaLabel='Toggle clock' hourAriaLabel='Hour' minuteAriaLabel='Minute' onChange={onChange} value={time} />
                  </div>
                </div>
                {!habitProp && (
                  <div className='flex items-center gap-2'>
                    <label htmlFor='notTodo' className='text-blueGray-600 font-semibold'>
                      NotTodo
                    </label>
                    <input type='checkbox' id='notTodo' name='notTodo' checked={habit.notTodo} onChange={handleChange} />
                  </div>
                )}
              </div>
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
