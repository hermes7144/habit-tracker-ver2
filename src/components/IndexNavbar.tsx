import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';

export default function IndexNavbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { user, logout } = useAuthContext();

  return (
    <>
      <header className='top-0 z-50 w-full flex flex-wrap items-center px-2 py-3 bg-white  border-b border-gray-300 '>
        <div className='w-full px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <Link to='/' className='text-brand font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap'>
              HABITER
            </Link>
            <button className='cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none' type='button' onClick={() => setNavbarOpen(!navbarOpen)}>
              <FaBars />
            </button>
          </div>
          <div className={`lg:flex flex-grow items-center bg-white ${navbarOpen ? 'block' : 'hidden'}`}>
            <div className='flex justify-end lg:ml-auto gap-4'>
              {user && <User user={user} />}
              {!user && (
                <Link
                  to='/auth/login'
                  onClick={() => {
                    setNavbarOpen(false);
                  }}>
                  <Button text={'Login'} />
                </Link>
              )}
              {user && (
                <Button
                  text={'Logout'}
                  onClick={() => {
                    logout();
                    setNavbarOpen(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
