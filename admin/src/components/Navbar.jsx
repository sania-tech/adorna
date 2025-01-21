/**
 * Navbar Component
 * 
 * A React functional component that renders the top navigation bar for the application. It includes a logo and a logout button.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.setToken - A function to clear the authentication token, logging the user out.
 * 
 * @returns {JSX.Element} The rendered navigation bar.
 */
import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <img className='w-[max(10%,80px)]' src={assets.logo} alt="Logo" />
            <button
                onClick={() => setToken('')}
                className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
