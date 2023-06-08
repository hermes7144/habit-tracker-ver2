import React, { useState } from 'react';
import '../Calendar.css';
import moment from 'moment';
import 'moment/locale/fr';
import useHabits from '../hooks/useHabits';
import Modal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';
import FrequencyChip from '../components/FrequencyChip';
import { RiDeleteBin5Fill, RiPencilFill } from 'react-icons/ri';
import HabitForm from '../components/HabitForm';
import { useMediaQuery } from 'react-responsive';
import LineChart from '../components/LineChart';
import Calendar from 'react-calendar';
import DetailAchievement from '../components/DatailAchievement';

export default function DetailPage() {
  const navigate = useNavigate();
  const { removeItem } = useHabits();

  const {
    state: { habit, checkmarks },
  } = useLocation();

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
        <div className={`flex flex-col md:flex-row  ${window.innerWidth <= 768 ? 'items-center' : 'justify-between'} m-2 gap-4`}>
          <div className='w-full lg:max-w-md lg:w-4/12 px-2 shadow-lg rounded'>
            <p className='text-sm md:text-lg word break-all'>{habit.title}</p>
            <p className='text-xs text-gray-300 break-all'>설명: {habit.description}</p>
            {/* <p className='text-xs text-gray-300 break-all'>시작일자: {startDate.format('YYYY년 MM월 DD일')}</p>
            시작한지 {days}일 째 */}
            <table className='w-full mt-5 border-separate border-spacing-5'>
              <tbody>
                <tr key={habit.id}>
                  <th className='w-6/12 text-left'></th>
                  <td className='w-4/12'>
                    <FrequencyChip frequency={habit.frequency} />
                  </td>
                  <td className='w-1/12 text-lg md:text-2xl hover:text-gray-800 text-gray-500 cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <RiPencilFill className='text-2xl' onClick={openModal} />
                    </div>
                  </td>
                  <td className='w-1/12 text-lg md:text-2xl hover:text-gray-800 text-gray-500 cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <RiDeleteBin5Fill className='text-2xl' onClick={handleDelete} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='w-full lg:max-w-md lg:w-4/12 px-2 shadow-lg rounded'>
            <DetailAchievement habit={habit} totalDates={dateRange} checkDates={checkDates} />
          </div>
          <div className='w-full lg:max-w-md lg:w-4/12 px-2 shadow-lg rounded'>
            <Calendar calendarType='US' tileClassName={({ date }) => (checkDates.find((val) => val === moment(date).format('YYYY-MM-DD')) ? 'highlight' : '')} />
          </div>
        </div>
        <LineChart labels={dateRange} data={multipliedData} />
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
