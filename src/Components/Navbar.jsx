import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // NEW: State trackers mapping back to complete user schema records cached at Login
  const [userProfile, setUserProfile] = useState(null);
  const { cart, toggleCart } = useCart();

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/" || location.pathname === "";

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Synchronize authentication indicators on mount and location transitions
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user"); // Pulls full object dictionary

    if (token && storedUser) {
      setIsLoggedIn(true);
      try {
        setUserProfile(JSON.parse(storedUser));
      } catch (e) {
        setUserProfile(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserProfile(null);
    }
  }, [location]);

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
                ? "bg-white/95 backdrop-blur-md shadow-md text-brand-black"
                : "bg-transparent text-brand-black"
            }`
          : "sticky top-0 bg-white border-b border-slate-100 text-brand-black shadow-sm"
      }`}
    >
      <div className="text-2xl font-bold tracking-tight z-60">
        <Link to="/">Sentinel.</Link>
      </div>

      <div className="hidden md:flex gap-8 font-medium items-center">
        {["Home", "Phones", "About", "Contact"].map((link) => (
          <Link
            key={link}
            to={link === "Home" ? "/" : "#"}
            className="hover:text-brand-orange transition"
          >
            {link}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4 z-60">
        {/* CONDITIONAL AUTH: Displays ONLY the clean avatar frame when logged in */}
        {isLoggedIn ? (
          <button
            onClick={() => navigate("/profile")}
            className="w-9 h-9 rounded-full bg-brand-orange/10 border-2 border-brand-orange flex items-center justify-center text-brand-orange font-bold text-sm overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer"
            title="View Account Profile Dashboard"
          >
            {userProfile?.avatar && userProfile.avatar !== "https://ibb.co" ? (
              // Renders secure live Cloudinary profile upload file if present
              <img
                src={userProfile.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : userProfile?.firstName ? (
              // Fallback letter calculation utilizing real model entries
              userProfile.firstName.charAt(0).toUpperCase()
            ) : (
              <User className="w-5 h-5 text-brand-orange" />
            )}
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 cursor-pointer p-2 hover:scale-105 transition-transform text-brand-black"
          >
            <User className="w-6 h-6" />
            <span className="hidden sm:inline text-sm font-semibold">
              Login
            </span>
          </button>
        )}

        <button
          onClick={toggleCart}
          className="relative p-2 hover:scale-110 cursor-pointer transition-transform"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </button>

        <button
          className="md:hidden p-2 text-brand-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Layer */}
      <div
        className={`fixed inset-0 bg-white text-brand-black md:hidden flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {["Home", "Phones", "About", "Contact"].map((link) => (
          <Link
            key={link}
            to={link === "Home" ? "/" : "#"}
            className="text-2xl font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
            {link}
          </Link>
        ))}

        {isLoggedIn ? (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/profile");
            }}
            className="w-12 h-12 rounded-full border-2 border-brand-orange overflow-hidden bg-brand-orange/10 flex items-center justify-center font-bold text-brand-orange text-lg shadow-md mt-4"
          >
            {userProfile?.avatar && userProfile.avatar !== "https://ibb.co" ? (
              <img
                src={userProfile.avatar}
                alt="Mobile Avatar"
                className="w-full h-full object-cover"
              />
            ) : userProfile?.firstName ? (
              userProfile.firstName.charAt(0).toUpperCase()
            ) : (
              <User className="w-6 h-6 text-brand-orange" />
            )}
          </button>
        ) : (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/login");
            }}
            className="flex items-center gap-2 text-2xl font-bold text-brand-orange mt-4"
          >
            <User className="w-7 h-7" />
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
