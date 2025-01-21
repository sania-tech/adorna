import React from 'react';

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // Add logic to handle subscription, e.g., storing email, sending a request, etc.
    };

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>
        Subscribe now & get 20% off
      </p>
      <p className='text-gray-500 mt-3'>
        Stay updated with the latest collections and exclusive offers from Adorna.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 p-3 rounded-md'>
        <input 
            className='w-full sm:flex-1 outline-none p-2 border-none' 
            type="email" 
            placeholder='Enter your email' 
            required
        />
        <button 
            type='submit' 
            className='bg-black text-white text-sm px-6 py-2 rounded-md hover:bg-gray-800 transition duration-300'
        >
            SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;

