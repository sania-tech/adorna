// Import necessary modules and components
import React from 'react';
import Title from '../componets/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../componets/NewsletterBox';

// Contact component: Displays the contact page with store information and a newsletter section.
const Contact = () => {
  return (
    <div>
      {/* Title Section */}
      <div className='text-center text-2xl pt-10 border-t'>
          {/* Title component to display "CONTACT US" */}
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Information Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        {/* Image Section */}
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Image" />
        
        {/* Contact Details Section */}
        <div className='flex flex-col justify-center items-start gap-6'>
          {/* Store Information */}
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          <p className='text-gray-500'>Tel: (415) 555-0132 <br /> Email: admin@adorna.com</p>

          {/* Career Information */}
          <p className='font-semibold text-xl text-gray-600'>Careers at adorna</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          
          {/* Explore Jobs Button */}
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Subscription Box */}
      <NewsletterBox/>
    </div>
  )
}

// Export the Contact component for use in other parts of the application
export default Contact;

