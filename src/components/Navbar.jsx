import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArchive, FaPencilAlt } from 'react-icons/fa';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <FaArchive />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>

        {user && user.isAdmin && (
          <Link to='/products/new' className='text-2xl'>
            <FaPencilAlt />
          </Link>
        )}
        {user && (
          <Link to='/habits/new' className='text-2xl'>
            <FaPencilAlt />
          </Link>
        )}

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
