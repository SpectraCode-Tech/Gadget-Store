import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useCart } from "./CartContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, toggleCart } = useCart();

  const location = useLocation();
  const isHome = location.pathname === "/Gadget-Store";

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <nav
      className={`w-full h-20 px-6 flex justify-between items-center transition-all duration-300 z-50 ${
        isHome
          ? `fixed top-0 left-0 ${
              scrolled
                ? "bg-white shadow-md text-brand-black"
                : "bg-transparent text-brand-black"
            }`
          : "static bg-white border-b border-slate-100 text-brand-black shadow-sm"
      }`}
    >
      <div className="text-2xl font-bold tracking-tight z-[60]">
        <Link to="/">Sentinel.</Link>
      </div>

      <div className="hidden md:flex gap-8 font-medium items-center">
        {["Home", "Phones", "About", "Contact"].map((link) => (
          <Link
            key={link}
            to={link === "Home" ? "/Gadget-Store" : "#"}
            className="hover:text-brand-orange transition"
          >
            {link}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4 z-[60]">
        <button className="flex items-center gap-2 p-2 hover:scale-105 transition-transform">
          <User className="w-6 h-6" />
          <span className="hidden sm:inline text-sm font-semibold">Login</span>
        </button>

        <button
          onClick={toggleCart}
          className="relative p-2 hover:scale-110 transition-transform"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </button>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white text-brand-black md:hidden flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {["Home", "Phones", "About", "Contact"].map((link) => (
          <Link
            key={link}
            to={link === "Home" ? "/Gadget-Store" : "#"}
            className="text-2xl font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
            {link}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
