import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, GoogleLogin } from './index';
import authService from '../appwrite/auth';
import service from '../appwrite/conf_service';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import LoginBg from '../assets/login_bg.jpeg';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  async function login(data) {
    reset();
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          const user = await service.getUser(userData.$id);
          if (!user) {
            await service.createUser(userData);
          }
          dispatch(authLogin({ userData: { ...userData, userDetails: user } }));
          navigate('/');
          toast.success('Logged in successfully');
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex h-full gap-48">
      <div className="hidden h-full min-w-[300px] max-w-fit rounded-r-[50%] md:block">
        <img
          src={LoginBg}
          alt="login-background"
          className="hidden h-full rounded-r-[50%] md:inline-block"
        />
      </div>
      <div className="mt-[10vh] basis-full px-6 md:mt-0 md:basis-1/3 md:self-center md:px-0">
        <h2 className="text-center text-2xl font-semibold leading-tight">
          Log in to your account
        </h2>
        <div className="mt-4">
          <GoogleLogin label="Sign in with Google" />
        </div>
        <form
          onSubmit={handleSubmit(login)}
          className="mt-8 border-t border-gray-400 pt-4"
        >
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register('password', {
                required: true,
              })}
            />
            <Button type="submit" className="w-full font-Raleway font-medium">
              Log In
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link to="/signup" className="font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
