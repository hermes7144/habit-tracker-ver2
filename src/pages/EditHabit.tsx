import { useState } from 'react';
import Modal from 'react-modal';
import FrequencyChip from '../components/FrequencyChip';
import useHabits from '../hooks/useHabits';
import { HabitType } from './NewHabit';
import { RiPencilFill, RiDeleteBin5Fill } from 'react-icons/ri';
import HabitForm from '../components/HabitForm';

Modal.setAppElement('#root');

export default function EditHabit() {
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

  return (
    <>
      <table className='w-full mt-5'>
        <tbody>
          {habits?.map((habit: HabitType) => (
            <tr key={habit.id}>
              <th className='w-8/12 text-left'>
                <p className='text-lg'>{habit.title}</p>
                <p className='text-xs text-gray-300'>{habit.description}</p>
              </th>
              <td className='w-2/12'>
                <FrequencyChip frequency={habit.frequency} />
              </td>
              <td className='text-2xl w-1/12 hover:text-gray-800 text-gray-500 cursor-pointer'>
                <div className='flex items-center justify-center'>
                  <RiPencilFill onClick={() => openModal(habit)} />
                </div>
              </td>
              <td className='text-2xl w-1/12 hover:text-gray-800 text-gray-500 cursor-pointer'>
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
          content: {
            position: 'absolute',
            top: '250px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '510px',
            height: '460px',
          },
        }}>
        <HabitForm closeModal={closeModal} habitProp={habit} />
      </Modal>
    </>
  );
}
