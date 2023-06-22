import React, { useState } from 'react';
import CardWrapperCol from './CardWrapperCol';
import moment from 'moment';
import 'moment/locale/fr';
import { RiDeleteBin5Fill, RiPencilFill } from 'react-icons/ri';
import FrequencyChipDetail from '../components/FrequencyChipDetail';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import useHabits from '../hooks/useHabits';
import Modal from 'react-modal';
import HabitForm from '../components/HabitForm';
import { useMediaQuery } from 'react-responsive';

export default function HabitSetting({ habit, startDate }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addOrUpdateItem, removeItem } = useHabits();
  const navigate = useNavigate();
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      removeItem.mutate(habit.id);
      navigate('/');
    }
  };

  const handleComplete = () => {
    if (window.confirm('완료하시겠습니까?')) {
      const completeHabit = { ...habit, completed: !habit.completed };
      addOrUpdateItem.mutate(completeHabit, {
        onSuccess: () => {
          closeModal();
          navigate('/');
        },
      });
      navigate('/');
    }
  };

  const habitDays = moment().diff(moment(habit.createdAt).format('YYYY-MM-DD'), 'days') + 1;
  const isDesktopOrMobile = useMediaQuery({ minWidth: 1024 });

  const content = isDesktopOrMobile
    ? {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '510px',
        height: '380px',
      }
    : {
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '360px',
        height: '380px',
      };

  return (
    <>
      <CardWrapperCol>
        <div className='flex justify-between p-5'>
          <div>
            <p className='text-lg font-bold word break-all'>{habit.title}</p>
            <p className='text-xs text-gray-500 break-all'>{habit.description}</p>
            <p className='text-xs text-gray-500 break-all'>
              시작일자: {startDate.format('YYYY년 MM월 DD일')}({habitDays}일 째)
            </p>
          </div>
          <div className='flex gap-3 justify-center items-center'>
            <div className='p-2 rounded-full hover:bg-gray-300'>
              <RiPencilFill className='text-2xl text-gray-500 cursor-pointer' onClick={openModal} />
            </div>
            <div className='p-2 rounded-full hover:bg-gray-300'>
              <RiDeleteBin5Fill className='text-2xl text-gray-500 cursor-pointer hover:text-gray-600' onClick={handleDelete} />
            </div>
          </div>
        </div>
        <div className='flex w-full justify-center items-center flex-1'>
          <FrequencyChipDetail frequency={habit.frequency} />
        </div>
        <div className='flex justify-end gap-2'>
          <Button text={`습관 ${habit.completed ? '재시작' : '완료'}`} onClick={handleComplete} />
        </div>
      </CardWrapperCol>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ content }}>
        <HabitForm closeModal={closeModal} habitProp={habit} />
      </Modal>
    </>
  );
}
