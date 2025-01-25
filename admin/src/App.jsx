import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Environment variables for backend URL and currency symbol
export const backendUrl = import.meta.env.VITE_BACKEND_URL
const backendUrl = "https://adorna-backend.vercel.app"
export const currency = '$'

/**
 * Main App component for the admin dashboard.
 * This component manages the routes, authentication, and layout.
 */
const App = () => {

  // State to store the authentication token
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  // Store token in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Toast notifications container */}
      <ToastContainer />

      {/* Conditional rendering based on authentication token */}
      {token === "" 
        ? (
          // If no token, show login page
          <Login setToken={setToken} />
        ) 
        : (
          // If token is available, show the main dashboard layout
          <>
            {/* Navbar component with token update functionality */}
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              {/* Sidebar component for navigation */}
              <Sidebar />
              {/* Main content area */}
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                {/* Routing setup */}
                <Routes>
                  {/* Define routes for different pages */}
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default App
