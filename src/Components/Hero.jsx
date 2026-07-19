import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Image Imports
import slide1 from "../assets/slide1.jpeg";
import mobileslide1 from "../assets/mobileslide1.jpeg";
import slide2 from "../assets/slide2.jpeg";
import mobileslide2 from "../assets/mobileslide2.jpeg";
import slide3 from "../assets/slide3.jpeg";
import mobileslide3 from "../assets/mobileslide3.jpeg";
import slide4 from "../assets/slide4.jpeg";
import mobileslide4 from "../assets/mobileslide4.jpeg";
import slide5 from "../assets/slide5.jpeg";
import mobileslide5 from "../assets/mobileslide5.jpeg";

const slides = [
  {
    desktop: slide1,
    mobile: mobileslide1,
    headline: "New Arrivals. Big Savings.",
    subtext: "The latest flagship phones, just landed.",
    cta: "Shop Now",
    align: "left",
  },
  {
    desktop: slide2,
    mobile: mobileslide2,
    headline: "Up To 40% Off",
    subtext: "Smartwatches, earbuds & more this week.",
    cta: "Explore Deals",
    align: "left",
  },
  {
    desktop: slide3,
    mobile: mobileslide3,
    headline: "Top Rated Earbuds",
    subtext: "Loved by thousands of customers.",
    cta: "View Bestsellers",
    align: "right",
  },
  {
    desktop: slide4,
    mobile: mobileslide4,
    headline: "100% Authentic. Always.",
    subtext: "Free delivery & full warranty on every order.",
    cta: "Learn More",
    align: "left",
  },
  {
    desktop: slide5,
    mobile: mobileslide5,
    headline: "Bundle & Save",
    subtext: "Get more when you shop the full set.",
    cta: "Shop Bundles",
    align: "left",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const changeSlide = (newIndex) => {
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
  };

  const nextSlide = () => changeSlide((currentSlide + 1) % slides.length);
  const prevSlide = () =>
    changeSlide((currentSlide - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-brand-black">
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
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset }) => {
            if (offset.x > 100) prevSlide();
            else if (offset.x < -100) nextSlide();
          }}
          className="absolute inset-0"
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={slide.mobile} />
            <img
              src={slide.desktop}
              alt={slide.headline}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </picture>

          {/* Dynamic Scrim based on alignment */}
          <div
            className={`absolute inset-0 bg-gradient-to-${slide.align === "right" ? "l" : "r"} from-brand-black/80 via-brand-black/40 to-transparent`}
          />

          <div
            className={`absolute inset-0 flex items-center px-6 md:px-16 ${slide.align === "right" ? "justify-end text-right" : "justify-start text-left"}`}
          >
            <div className="max-w-md">
              <h2 className="text-brand-white text-3xl md:text-5xl font-bold mb-3">
                {slide.headline}
              </h2>
              <p className="text-brand-white/90 text-base md:text-lg mb-6">
                {slide.subtext}
              </p>
              <button className="px-8 py-3 rounded-full bg-brand-orange text-brand-white font-bold hover:bg-orange-600 transition shadow-lg">
                {slide.cta}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-white/10 backdrop-blur-md border border-brand-white/20 text-brand-white hover:bg-brand-white/20 transition z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-white/10 backdrop-blur-md border border-brand-white/20 text-brand-white hover:bg-brand-white/20 transition z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 rounded-full ${index === currentSlide ? "w-8 h-3 bg-brand-orange" : "w-3 h-3 bg-brand-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
