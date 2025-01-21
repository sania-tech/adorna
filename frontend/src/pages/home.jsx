// Import necessary modules and components
import React from 'react';
import Hero from '../componets/Hero';
import LatestCollection from '../componets/LatestCollection';
import BestSeller from '../componets/BestSeller';
import OurPolicy from '../componets/OurPolicy';
import NewsletterBox from '../componets/NewsletterBox';

// Home component: Displays the homepage with multiple sections.
const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      {/* Renders the Hero component, likely showing a large image or promotional content */}
      <Hero />
      
      {/* Latest Collection Section */}
      {/* Displays the LatestCollection component to showcase new items */}
      <LatestCollection/>

      {/* Best Seller Section */}
      {/* Displays the BestSeller component to showcase popular products */}
      <BestSeller/>

      {/* Our Policy Section */}
      {/* Renders the OurPolicy component, likely showing terms, conditions, and other important information */}
      <OurPolicy/>

      {/* Newsletter Subscription Section */}
      {/* Displays the NewsletterBox component for email subscriptions */}
      <NewsletterBox/>
    </div>
  )
}

// Export the Home component for use in other parts of the application
export default Home;

