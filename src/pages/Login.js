import React, { useState } from 'react';

import axios from 'axios';
import Button from '../components/Buttons/Button';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });

      console.log('User added successfully:', response.data);
    } catch (err) {
      setError('Error occurred while adding the user.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-500 ease-in-out">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700 animate__animated animate__fadeIn">
          Login
        </h2>

        <form className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 transition duration-300 ease-in-out transform"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 transition duration-300 ease-in-out transform"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <ErrorMessage msg={error}/>}
          
          <Button type="primary" text="Login" customStyle="w-full" onClick={handleSubmit} />
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline hover:text-blue-700 transition duration-300 ease-in-out">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
