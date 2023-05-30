import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import DashBoard from './DashBoard';
import Modal from 'react-modal';
import HabitForm from '../components/HabitForm';

Modal.setAppElement('#root');

export default function MyWebsite() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <DashBoard />

      <div className='fixed bottom-0 right-0 m-7 bg-brand rounded-full p-4 cursor-pointer' onClick={openModal}>
        <AiOutlinePlus className='text-white' />
      </div>

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
        <HabitForm closeModal={closeModal} habitProp={null} />
      </Modal>
    </div>
  );
}
