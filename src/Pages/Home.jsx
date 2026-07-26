import React from 'react'
import Hero from '../Components/Hero';
import Categories from '../Components/Categories';
import HomeAdBanner from '../Components/HomeAdBanner';
import PopularProducts from '../Components/PopularProducts';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <>
    <Navbar />
      <Hero />
      <Categories />
      <HomeAdBanner />
      <PopularProducts />
    <Footer />
    </>
  )
}

export default Home
