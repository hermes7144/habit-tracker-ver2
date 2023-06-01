import { useState } from 'react';
import Modal from 'react-modal';
import FrequencyChip from '../components/FrequencyChip';
import useHabits from '../hooks/useHabits';
import { RiPencilFill, RiDeleteBin5Fill } from 'react-icons/ri';
import HabitForm from '../components/HabitForm';
import { useMediaQuery } from 'react-responsive';
import { HabitType } from './DashBoard';

Modal.setAppElement('#root');

export default function EditHabitPage() {
  const {
    habitsQuery: { isLoading, data: habits },
    removeItem,
  } = useHabits();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [habit, setHabit] = useState({});

  function openModal(habit) {
    setModalIsOpen(true);
    setHabit(habit);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleDelete = (id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      removeItem.mutate(id);
    }
  };

  if (isLoading) <p>Loading...</p>;

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
      <table className='w-full mt-5'>
        <tbody>
          {habits?.map((habit: HabitType) => (
            <tr key={habit.id}>
              <th className='w-6/12 text-left'>
                <p className='text-sm md:text-lg word break-all'>{habit.title}</p>
                <p className='text-xs text-gray-300 break-all'>{habit.description}</p>
              </th>
              <td className='w-4/12'>
                <FrequencyChip frequency={habit.frequency} />
              </td>
              <td className='w-1/12 text-lg md:text-2xl hover:text-gray-800 text-gray-500 cursor-pointer'>
                <div className='flex items-center justify-center'>
                  <RiPencilFill onClick={() => openModal(habit)} />
                </div>
              </td>
              <td className='w-1/12 text-lg md:text-2xl hover:text-gray-800 text-gray-500 cursor-pointer'>
                <div className='flex items-center justify-center'>
                  <RiDeleteBin5Fill onClick={() => handleDelete(habit.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
