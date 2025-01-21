import React from 'react';
import { assets } from '../assets/assets';

/**
 * Hero component displays the hero section of the website, including a catchy title, 
 * a description, and an image, typically used as the first section visible to users.
 * 
 * @component
 * 
 * @example
 * // Example usage:
 * <Hero />
 * 
 * @returns {JSX.Element} Renders the hero section with a title, subtitle, and a background image.
 */
const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">

      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] text-center sm:text-left">
        
          {/* Top Section: Line and Title */}
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>

          {/* Main Title */}
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>

          {/* Shop Now Subtitle */}
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>

        </div>
      </div>

      {/* Hero Image */}
      <img className="w-full sm:w-1/2" src={assets.hero_img} alt="Hero Image" />
    </div>
  );
};

export default Hero;


