import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Login from "./Pages/Login";
import CartDrawer from "./Components/CartDrawer";
import Register from "./Pages/Register";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/Gadget-Store">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>

        <CartDrawer />
      </BrowserRouter>
    </>
  );
};

export default App;
