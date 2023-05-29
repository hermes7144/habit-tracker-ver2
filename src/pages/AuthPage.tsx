import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import DashBoard from './DashBoard';
import Modal from 'react-modal';
import HabitForm from '../components/HabitForm';

Modal.setAppElement('#root');

export default function MyWebsite() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      {/* 웹사이트 컨텐츠 */}
      <DashBoard />
      {/* 하단 아이콘 */}
      <div className='fixed bottom-0 right-0 m-4 bg-blue-500 rounded-full p-4 cursor-pointer' onClick={openModal}>
        <AiOutlinePlus className='text-white' />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            position: 'absolute',
            top: '250px',
            left: '700px',
            right: '700px',
            bottom: '200px',
          },
        }}>
        <HabitForm closeModal={closeModal} habitProp={null} />
      </Modal>
    </div>
  );
}
