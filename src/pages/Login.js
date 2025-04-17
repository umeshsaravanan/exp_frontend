import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/Buttons/Button';
import ErrorMessage from '../components/ErrorMessage';
import GoogleLoginButton from '../components/Buttons/GoogleLoginButton';
import { useContextApi } from '../contexts/AuthContext';
import { useAxiosInstance } from '../contexts/AxiosContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { error, setErrorCallback, setUserCallback } = useContextApi();
  const {axiosInstance} = useAxiosInstance();

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(`/login`, {
        email,
        password,
      });
      
      if (response.data?.message === "Login Successful"){
        setUserCallback({name : response.data?.userName, email: email});
        navigate("/");
      }else{
        setErrorCallback(response.data?.message);
      }

    } catch (err) {
      setErrorCallback('Login Error');
      console.error('Error:', err);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-2 sm:p-0 bg-gradient-to-br from-[#256a63] to-[#029688]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex gap-4 items-center justify-center w-full">
          <img src="/images/exp_logo.png" alt="logo" className="w-[50px] h-[50px]" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#029688]">
            Expense Tracker
          </h2>
        </div>

        <h3 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Login
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 text-start"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#029688]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setErrorCallback(""); setEmail(e.target.value) }}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 text-start"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#029688]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => { setErrorCallback(""); setPassword(e.target.value) }}
              required
            />
          </div>

          {error && <ErrorMessage msg={error} />}

          <Button type="primary" text="Login" isLoading={isLoading} customStyle="w-full" />

          <GoogleLoginButton />
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#029688] hover:underline hover:text-[#256a63]">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
