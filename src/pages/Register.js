import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from '../components/Buttons/Button';
import ErrorMessage from '../components/ErrorMessage';
import { useContextApi } from '../contexts/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, setErrorCallback } = useContextApi();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/register', {
        name : username,
        email,
        password,
      });

      console.log('User registered successfully:', response.data);
    } catch (err) {
      setErrorCallback('Error occurred while registering the user.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-2 sm:p-0 bg-gradient-to-br from-[#256a63] to-[#029688]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center">
          <img src="/images/exp_logo.png" alt="logo" className="w-[50px] h-[50px]" />
          <h2 className="text-3xl font-bold text-[#029688]">Expense Tracker</h2>
        </div>

        <h3 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Register
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 text-start"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#029688]"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <ErrorMessage msg={error} />}

          <Button type="primary" text="Register" customStyle="w-full" />
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-[#029688] hover:underline hover:text-[#256a63]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
