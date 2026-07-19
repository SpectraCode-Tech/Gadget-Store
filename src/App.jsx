import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import CartDrawer from "./Components/CartDrawer";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <>
      <BrowserRouter >
      <Navbar />
      <Routes>
        <Route path="/Gadget-Store" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>

      <CartDrawer />
      <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
