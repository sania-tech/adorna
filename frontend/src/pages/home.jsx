import React from 'react'
import Hero from '../componets/Hero'
import LatestCollection from '../componets/LatestCollection'
import BestSeller from '../componets/BestSeller'
import OurPolicy from '../componets/OurPolicy'
import NewsletterBox from '../componets/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
