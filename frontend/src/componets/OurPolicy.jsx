import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-4 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      {/* Easy Exchange Policy */}
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Easy Exchange" />
        <p className='font-semibold text-lg text-gray-800'>Easy Exchange Policy</p>
        <p className='text-gray-500'>Hassle-free exchanges for your convenience</p>
      </div>

      {/* 7 Days Return Policy */}
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="Return Policy" />
        <p className='font-semibold text-lg text-gray-800'>7 Days Return Policy</p>
        <p className='text-gray-500'>Enjoy free returns within 7 days of purchase</p>
      </div>

      {/* Best Customer Support */}
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="Customer Support" />
        <p className='font-semibold text-lg text-gray-800'>Best Customer Support</p>
        <p className='text-gray-500'>24/7 support to assist you with your needs</p>
      </div>

    </div>
  );
};

export default OurPolicy;
