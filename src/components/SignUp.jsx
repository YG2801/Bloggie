import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, GoogleLogin, Input } from './index';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import service from '../appwrite/conf_service';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice';
import SignUpBg from '../assets/signup_bg.jpeg';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  async function signup(data) {
    reset();
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          const user = await service.createUser(userData);
          if (user) {
            dispatch(
              authLogin({ userData: { ...userData, userDetails: user } })
            );
            navigate('/');
            toast.success('Account created successfully');
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex h-full gap-48">
      <img
        src={SignUpBg}
        alt="login-background"
        className="hidden h-full rounded-r-[50%] md:inline-block"
      />
      <div className="mt-[6vh] basis-full px-6 md:mt-0 md:basis-1/3 md:self-center md:px-0">
        <h2 className="px-6 text-center text-2xl font-semibold leading-tight">
          Sign up to create an account
        </h2>
        <div className="mt-4">
          <GoogleLogin label="Sign up with Google" />
        </div>
        <form
          onSubmit={handleSubmit(signup)}
          className="mt-8 border-t border-gray-400 pt-4"
        >
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register('name', {
                required: true,
              })}
            />
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
              Create Account
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center text-black/60">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
