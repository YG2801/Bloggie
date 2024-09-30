import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import authService from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        toast.success('Logged out successfully');
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        navigate('/');
      });
  };
  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-md bg-[#7A59BD] px-4 py-2 font-Raleway text-lg font-medium text-white transition-colors hover:bg-[#614499] md:ml-8 md:w-auto"
      onClick={handleLogout}
    >
      <p>Log out</p>
      <MdLogout />
    </button>
  );
}
