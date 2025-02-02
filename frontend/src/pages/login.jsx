// Import necessary modules and components
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContest';
import axios from 'axios';
import { toast } from 'react-toastify';

// Login component: Handles user authentication for both login and sign-up.
const Login = () => {

  // States for form fields and current state (Login or Sign Up)
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  // States for capturing user input (name, email, password)
  const [name, setName] = useState('');
  const [password, setPasword] = useState('');
  const [email, setEmail] = useState('');

  // Handles form submission for both Sign Up and Login
  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        // Handle Sign Up
        if (currentState === 'Sign Up') {
          const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
          if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
          } else {
            toast.error(response.data.message);
          }
        } else {
          // Handle Login
          const response = await axios.post(backendUrl + '/api/user/login', { email, password });
          if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  };

  // Redirect to homepage if the user is already logged in
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      {/* Header: Displays current state (Login or Sign Up) */}
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Name field (only displayed for Sign Up) */}
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}

      {/* Email field */}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />

      {/* Password field */}
      <input onChange={(e) => setPasword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

      {/* Forgot password and toggle between Login and Sign Up */}
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className=' cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login'
          ? <p onClick={() => setCurrentState('Sign Up')} className=' cursor-pointer'>Create account</p>
          : <p onClick={() => setCurrentState('Login')} className=' cursor-pointer'>Login Here</p>
        }
      </div>

      {/* Submit button */}
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  );
}

// Export the Login component for use in other parts of the application
export default Login;

