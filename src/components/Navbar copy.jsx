import React from 'react';
import {FaBars} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { user, logout } = useAuthContext();

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-2xl font-bold text-brand'>
        <h1>HABITER</h1>
      </Link>

      {user && (
        <ul className='flex  list-none ml-6 mr-auto'>
          {/* <li className='flex items-center'>
            <Link to='/' className='hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'>
              DashBoard
            </Link>
          </li> */}

          <li className='flex items-center'>
            <Link to='/habits/edit' className='hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'>
              Manage
            </Link>
          </li>
          <button className='cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none' type='button' onClick={() => setNavbarOpen(!navbarOpen)}>
            <FaBars />
          </button>
        </ul>
      )}

      <nav className='flex items-center gap-4 font-semibold'>
        {user && <User user={user} />}
        {!user && (
          <Link to='/auth/login'>
            <Button text={'Login'} />
          </Link>
        )}
        {user && <Button text={'Logout'} onClick={logout} />}
      </nav>
    </header>
  );
}
