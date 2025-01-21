/**
 * About Component
 * 
 * This component displays the "About Us" and "Why Choose Us" sections for the website, along with a 
 * newsletter subscription box. The content in the "About Us" section introduces the company, its 
 * mission, and the story behind its inception. The "Why Choose Us" section highlights the key selling 
 * points of the business. The component uses the `Title` and `NewsletterBox` components to structure 
 * and present this information.
 * 
 * Key Features:
 * - Displays the story behind the company and its mission.
 * - Highlights key reasons for customers to choose the service.
 * - Incorporates a responsive layout with flexibility for both mobile and desktop views.
 * - Uses reusable `Title` and `NewsletterBox` components.
 * 
 * @component
 * @example
 * return (
 *   <About />
 * )
 */

import React from 'react';
import Title from '../componets/Title'; // Importing the Title component
import { assets } from '../assets/assets'; // Importing assets for images
import NewsletterBox from '../componets/NewsletterBox'; // Importing the NewsletterBox component

/**
 * The About component renders the main content for the About Us page.
 * It includes an introductory section about the company and its mission,
 * as well as reasons why customers should choose the business. Additionally,
 * it features a newsletter subscription box.
 * 
 * @returns {JSX.Element} The rendered About Us page content.
 */
const About = () => {
  return (
    <div>

      {/* Title Section */}
      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Company Description and Mission */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About Us Image" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Adorna was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
              <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>Our mission at Adorna is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox/>
      
    </div>
  );
}

export default About;
