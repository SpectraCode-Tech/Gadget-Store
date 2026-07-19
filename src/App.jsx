import React from 'react'
import Home from './Pages/Home';
import CartDrawer from './Components/CartDrawer';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <CartDrawer />
      <Footer />
    </div>
  )
}

export default App
