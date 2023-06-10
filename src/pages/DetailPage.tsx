import React, { useState } from 'react';
import '../Calendar.css';
import moment from 'moment';
import 'moment/locale/fr';
import useHabits from '../hooks/useHabits';
import Modal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiDeleteBin5Fill, RiPencilFill } from 'react-icons/ri';
import HabitForm from '../components/HabitForm';
import { useMediaQuery } from 'react-responsive';
import LineChart from '../components/LineChart';
import Calendar from 'react-calendar';
import DetailAchievement from '../components/DatailAchievement';
import { CheckType, HabitType } from './DashBoard';
import FrequencyChipDetail from '../components/FrequencyChipDetail';

export default function DetailPage() {
  const navigate = useNavigate();
  const { removeItem } = useHabits();

  const location = useLocation();

  const { habit, checkmarks } = location.state as { habit: HabitType; checkmarks: CheckType[] };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      removeItem.mutate(habit.id);
      navigate('/');
    }
  };

  const habitDays = moment().diff(habit.createdAt, 'days') + 2;

  const checkDates = checkmarks.filter((checkmark) => checkmark.habitId === habit.id && habit.frequency.includes((moment(checkmark.date).day() + 6) % 7)).map((checkmark) => checkmark.date);

  const startDate = moment(habit.createdAt);

  const getDatesInRange = (startDate) => {
    const dates = [];

    const currentDate = moment();
    const days = currentDate.diff(startDate, 'days');
    if (days >= 0) {
      let current = moment(startDate);

      // 시작 날짜부터 오늘까지의 날짜를 계산하여 목록에 추가
      for (let i = 0; i <= days; i++) {
        dates.push(current.format('YYYY-MM-DD'));
        current = current.add(1, 'day');
      }
    }
    return dates;
  };

  const dateRange = getDatesInRange(startDate);
  const isDateIncluded = dateRange.map((date) => checkDates.includes(date));

  let result = 1;
  const multipliedData = isDateIncluded.map((value) => {
    if (value) {
      result *= 1.01;
    }
    return result;
  });

  const isDesktopOrMobile = useMediaQuery({ minWidth: 768 });

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
      <div className='mt-2'>
        <div className={`flex flex-col md:flex-row ${window.innerWidth <= 768 ? 'items-center' : 'justify-between'} m-2 gap-4`}>
          <div className='flex flex-col w-full lg:w-4/12 px-2 shadow-lg rounded min-h-[272px]'>
            <div className='flex justify-between p-5'>
              <div>
                <p className='text-lg font-bold word break-all'>{habit.title}</p>
                <p className='text-xs text-gray-500 break-all'>{habit.description}</p>
                <p className='text-xs text-gray-500 break-all'>
                  시작일자: {startDate.format('YYYY년 MM월 DD일')}({habitDays}일 째)
                </p>
              </div>
              <div className='flex gap-3 justify-center items-center'>
                <RiPencilFill className='text-2xl text-gray-500' onClick={openModal} />
                <RiDeleteBin5Fill className='text-2xl text-gray-500' onClick={handleDelete} />
              </div>
            </div>
            <div className='flex w-full justify-center items-center flex-1'>
              <FrequencyChipDetail frequency={habit.frequency} />
            </div>
          </div>

          <div className='w-full lg:max-w-md lg:w-4/12 px-2 shadow-lg rounded'>
            <DetailAchievement habit={habit} totalDates={dateRange} checkDates={checkDates} />
          </div>
          <div className='w-full lg:w-4/12'>
            <Calendar calendarType='US' tileClassName={({ date }) => (checkDates.find((val) => val === moment(date).format('YYYY-MM-DD')) ? 'highlight' : '')} />
          </div>
        </div>
        <div className='flex justify-center max-w-screen-2xl h-auto lg:h-[500px] shadow-lg rounded mx-2'>
          <LineChart data={multipliedData} />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content,
        }}>
        <HabitForm closeModal={closeModal} habitProp={habit} />
      </Modal>
    </>
  );
}
