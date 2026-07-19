import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "./CartContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, toggleCart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return (
      <nav
        // Added h-20 to ensure it has a consistent physical height
        className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 px-6 flex justify-between items-center ${
          scrolled
            ? "bg-white shadow-md text-brand-black"
            : "bg-transparent text-white"
        }`}
      >
        <div className="text-2xl font-bold tracking-tight z-[60]">
          Sentinel.
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-medium items-center">
          {["Home", "Phones", "About", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-brand-orange transition"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 z-[60]">
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
            {/* Use a dynamic color class based on the 'scrolled' state */}
            {isMenuOpen ? (
              <X className="w-6 h-6 text-brand-black" />
            ) : (
              <Menu
                className={`w-6 h-6 ${scrolled ? "text-brand-black" : "text-white"}`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-white text-brand-black md:hidden flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {["Home", "Phones", "About", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-2xl font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      </nav>
    );
  };

export default Navbar;
