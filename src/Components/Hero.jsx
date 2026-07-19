import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Eye,
  Plus,
} from "lucide-react";
import { useCart } from "./CartContext";

import slide1 from "../assets/slide1.jpeg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.jpeg";
import slide4 from "../assets/slide4.jpeg";
import slide5 from "../assets/slide5.jpeg";

const topProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1050000,
    originalPrice: 1250000,
    img: slide1,
  },
  {
    id: 2,
    name: "Galaxy S24 Ultra",
    price: 980000,
    originalPrice: 1150000,
    img: slide2,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 350000,
    originalPrice: 420000,
    img: slide3,
  },
  {
    id: 4,
    name: "MacBook Air M3",
    price: 1200000,
    originalPrice: 1400000,
    img: slide4,
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    price: 450000,
    originalPrice: 520000,
    img: slide5,
  },
];

// Tracks whether we're at desktop width (matches your md: breakpoint)
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false,
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isDesktop;
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [qty, setQty] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const isDesktop = useIsDesktop();

  const changeSlide = (newIndex) => {
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
    setQty(1);
  };

  const nextSlide = () => changeSlide((currentSlide + 1) % topProducts.length);
  const prevSlide = () =>
    changeSlide((currentSlide - 1 + topProducts.length) % topProducts.length);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, isHovered]);

  const product = topProducts[currentSlide];
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <section
      className="relative w-full h-dvh overflow-hidden bg-white group pt-16 md:pt-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={{
            enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          drag={isDesktop ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset }) => {
            if (offset.x > 100) prevSlide();
            else if (offset.x < -100) nextSlide();
          }}
          className="absolute inset-0 flex flex-col justify-center md:grid md:grid-cols-2 md:justify-normal"
        >
          {/* Image Side — top on mobile, RIGHT on desktop */}
          <div className="flex items-center justify-center px-4 md:p-12 order-1 md:order-2 overflow-hidden">
            <img
              src={product.img}
              alt={product.name}
              className="max-h-[30vh] md:max-h-[70vh] object-contain"
              draggable={false}
            />
          </div>

          {/* Text Side — bottom on mobile, LEFT on desktop */}
          <div className="flex-none flex flex-col justify-center px-6 pt-2 pb-6 md:px-24 md:pt-0 md:pb-0 z-10 order-2 md:order-1">
            <div className="max-w-lg text-center md:text-left mx-auto md:mx-0">
              <span className="text-brand-orange font-bold tracking-widest uppercase text-[10px] md:text-sm mb-1 block">
                Best Seller
              </span>
              <h2 className="text-brand-black text-xl md:text-6xl font-bold mb-2 md:mb-4">
                {product.name}
              </h2>
              <p className="text-brand-black/70 text-sm md:text-xl mb-5">
                Get the latest technology at the best price in Nigeria.
              </p>

              {/* Price stands alone */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="text-xl md:text-3xl font-bold text-brand-black">
                  ₦{product.price.toLocaleString()}
                </span>
                <span className="text-sm md:text-lg text-brand-black/40 line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs md:text-sm font-bold text-brand-orange bg-brand-orange/10 px-2 py-1 rounded-full">
                  Save {discountPercent}%
                </span>
              </div>

              {/* Controls row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4">
                <div className="flex items-center bg-gray-100 rounded-full border border-gray-200">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1.5 md:px-4 md:py-2 text-sm"
                  >
                    -
                  </button>
                  <span className="px-2 font-bold text-sm">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-1.5 md:px-4 md:py-2 text-sm"
                  >
                    +
                  </button>
                </div>

                <button className="p-2.5 md:p-3 rounded-full border-2 border-brand-black hover:bg-brand-black hover:text-white transition">
                  <Eye className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <button
                  onClick={() => addToCart(product, qty)}
                  className="relative bg-brand-orange text-white p-3 md:p-4 rounded-full hover:bg-orange-600 transition shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                  <Plus className="w-2.5 h-2.5 md:w-3 md:h-3 absolute top-2 right-2 bg-brand-orange rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-white/80 shadow-md text-black opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20"
      >
        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-white/80 shadow-md text-black opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20"
      >
        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {topProducts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => changeSlide(idx)}
            className={`h-2 rounded-full transition-all ${currentSlide === idx ? "w-8 bg-brand-orange" : "w-2 bg-gray-300"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
