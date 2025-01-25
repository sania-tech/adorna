import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContest';

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        // Remove token, clear cart, and navigate to login page
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
       
    };

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="Adorna Logo" />
            </Link>
            
            <ul className="hidden sm:flex gap-6 text-sm text-gray-700 items-center -mt-1">
  <NavLink to="/" className="flex flex-col items-center gap-1 hover:text-black">
    <p>HOME</p>
    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
  </NavLink>
  <NavLink to="/collection" className="flex flex-col items-center gap-1 hover:text-black">
    <p>COLLECTION</p>
    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
  </NavLink>
  <NavLink to="/about" className="flex flex-col items-center gap-1 hover:text-black">
    <p>ABOUT</p>
    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
  </NavLink>
  <NavLink to="/contact" className="flex flex-col items-center gap-1 hover:text-black">
    <p>CONTACT</p>
    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
  </NavLink>
  <NavLink
    to="https://adorna-admin.vercel.app"
    className="flex items-center justify-center px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-700 hover:text-white transition-all duration-300 shadow-md"
  >
    Admin
  </NavLink>
</ul>

            

            <div className='flex items-center gap-6'>
                {/* Search Icon */}
                <img 
                    onClick={() => { setShowSearch(true); navigate('/collection'); }} 
                    src={assets.search_icon} 
                    className='w-5 cursor-pointer' 
                    alt="Search Icon" 
                />
                
                {/* Profile Icon with Dropdown */}
                <div className='group relative'>
                    <img 
                        onClick={() => token ? null : navigate('/login')} 
                        className='w-5 cursor-pointer' 
                        src={assets.profile_icon} 
                        alt="Profile Icon" 
                    />
                    {/* Dropdown Menu */}
                    {token && 
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>

                {/* Cart Icon */}
                <Link to='/cart' className='relative'>
                    <img 
                        src={assets.cart_icon} 
                        className='w-5 min-w-5' 
                        alt="Cart Icon" 
                    />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>

                {/* Mobile Menu Icon */}
                <img 
                    onClick={() => setVisible(true)} 
                    src={assets.menu_icon} 
                    className='w-5 cursor-pointer sm:hidden' 
                    alt="Mobile Menu Icon" 
                />
            </div>

            {/* Sidebar Menu for Small Screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back Icon" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;



