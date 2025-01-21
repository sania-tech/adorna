/**
 * SearchBar Component
 *
 * This component renders a search bar on the page when the `showSearch` state is true and the user is on the "collection" page. 
 * It allows users to search for products by typing into an input field. 
 * The search input is linked to the `search` state in the `ShopContext`. 
 * A cross icon is provided to close the search bar and set `showSearch` to false.
 *
 * - `search`: The current search query value, managed by the `ShopContext`.
 * - `setSearch`: A function to update the `search` value in the `ShopContext`.
 * - `showSearch`: A boolean state from `ShopContext` that controls whether the search bar is visible.
 * - `setShowSearch`: A function to toggle the visibility of the search bar.
 * - `visible`: A local state to determine if the search bar should be shown based on the current location.
 *
 * The component uses the `useLocation` hook to check if the current URL path includes "collection". If so, the search bar is made visible.
 * 
 * The `input` field updates the `search` state on every change, and the cross icon closes the search bar when clicked.
 */
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContest'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    // Determines visibility of search bar based on the current location
    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    },[location]);

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className='flex-1 outline-none bg-inherit text-sm' 
          type="text" 
          placeholder='Search'
        />
        <img className='w-4' src={assets.search_icon} alt="search icon" />
      </div>
      <img 
        onClick={() => setShowSearch(false)} 
        className='inline w-3 cursor-pointer' 
        src={assets.cross_icon} 
        alt="close icon" 
      />
    </div>
  ) : null;
}

export default SearchBar;

