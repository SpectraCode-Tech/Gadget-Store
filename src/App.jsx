import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Login from "./Pages/Login";
import CartDrawer from "./Components/CartDrawer";
import Register from "./Pages/Register";
import Checkout from "./Pages/Checkout";
import Profile from "./Pages/Profile";
import AdminDashboard from "./Admin/AdminDashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        <CartDrawer />
      </BrowserRouter>
    </>
  );
};

export default App;
