import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components/index';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import service from './appwrite/conf_service';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import { Loader, Modal } from './components/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkUser() {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          const user = await service.getUser(userData.$id);
          if (!user) {
            await service.createUser(userData);
          }
          dispatch(login({ userData: { ...userData, userDetails: user } }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  return !loading ? (
    <div className="font-Poppins bg-cream-bg flex min-h-screen flex-col">
      <div className="blob fixed -left-[5%] -top-[5%] h-[400px] w-[400px] bg-[#f1d7f1c2]" />
      <div className="blob blob-delay-1 fixed -right-[5%] bottom-0 h-[300px] w-[300px] bg-[#baf1c1c5]" />
      <div className="blob blob-delay-2 fixed -bottom-[10%] left-[20%] h-[200px] w-[200px] bg-[#f2f3b6bb]" />
      <div className="blob blob-delay-3 fixed right-[10%] top-0 h-[500px] w-[500px] bg-[#b6e4f3bb]" />
      <Modal />
      <Header />
      <main className="z-20 min-h-[calc(100vh-76px)]">
        <Outlet />
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
      <ToastContainer
        className={'toast-container'}
        position="bottom-right"
        autoClose={5000}
        newestOnTop={true}
      />
    </div>
  ) : (
    <Loader />
  );
}
