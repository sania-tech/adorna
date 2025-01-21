import React from 'react';
import { assets } from '../assets/assets';  // Importing assets (e.g., logo) from the assets folder

/**
 * Footer component displays the footer section of the website with company information, contact details, and a copyright notice.
 * 
 * @component
 * 
 * @example
 * // Example usage:
 * <Footer />
 * 
 * @returns {JSX.Element} Renders the footer with company details, contact information, and copyright message.
 */
const Footer = () => {
  return (
    <div>
      {/* Main Footer Section */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* Company Introduction */}
        <div>
            <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
            <p className="w-full md:w-2/3 text-gray-600">
              Adorna is fashion store, that was build and setup by a team of 5 students as a software development project. 
              This E-commerce store aims to provide a wide range of fashion products to customers. 
            </p>
        </div>

        {/* Company Links */}
        <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        {/* Contact Information */}
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>+1-212-456-7890</li>
                <li>contact@adorna.com</li>
            </ul>
        </div>

      </div>

      {/* Copyright Information */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024@ adorna.com - All Rights Reserved.</p>
      </div>

    </div>
  );
}

export default Footer;

