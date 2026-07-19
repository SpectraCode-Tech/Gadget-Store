import React from 'react'
import Hero from '../Components/Hero';
import Categories from '../Components/Categories';
import HomeAdBanner from '../Components/HomeAdBanner';
import PopularProducts from '../Components/PopularProducts';

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <HomeAdBanner />
      <PopularProducts />
    </div>
  )
}

export default Home
