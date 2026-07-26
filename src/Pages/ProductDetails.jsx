import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Maximize2,
  Truck,
  ShieldCheck,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { useCart } from "../Components/CartContext";
import mainImg from "../assets/slide1.jpeg";
import altImg1 from "../assets/slide2.jpeg";
import altImg2 from "../assets/slide3.jpeg";
import altImg3 from "../assets/slide4.jpeg";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ProductDetails = ({ product }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  // Color selection state
  const colors = [
    { name: "Obsidian Black", hex: "#1e293b" },
    { name: "Pure White", hex: "#f8fafc", border: "#cbd5e1" },
    { name: "Brand Orange", hex: "#f97316" },
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const images = product?.images || [mainImg, altImg1, altImg2, altImg3];

  const item = product || {
    name: "Liberty Buds Wireless Semi-in-ear Earbuds With Anc",
    price: 150000,
    oldPrice: 320000,
    desc: "Experience the ultimate performance with advanced ANC and ergonomic design.",
    fullDescription:
      "The semi-in-ear fit with detachable ear fins provides a secure, pressure-free experience, reducing pressure and heat build-up in the ear compared to traditional in-ear designs. Real-time Adaptive ANC automatically adjusts noise cancellation modes by monitoring your surroundings for traffic, voices, and wind. Features Immersive Spatial Audio for rich 3D sound, AI-powered 4-mic noise reduction for clear calls, and real-time face-to-face AI translation via the soundcore app.",
    productCode: "7016875",
    brand: "Anker",
    specs: {
      drivers: "11 mm Dynamic Drivers",
      playtime:
        "Up to 7 hours single charge / 30 hours total with case (ANC off)",
      playtimeAncOn: "Up to 6 hours single charge / 26 hours total with case",
      fastCharging: "10 mins charge = 4 hours playtime",
      bluetoothVersion: "6.1",
      audioCodecs: "LDAC, AAC",
      noiseCancellation: "Adaptive ANC 3.0",
      microphoneArray: "4 mics with AI noise reduction",
      waterResistance: "IP55 sweat and water-resistant",
      customizedEq: "HearID 4.0",
      multipointConnection: true,
      earFins: "Includes 4 interchangeable sizes",
    },
  };

  const discountPercent = item.oldPrice
    ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(
      { ...item, img: images[0], selectedColor: selectedColor.name },
      qty,
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Lightbox Overlay: z-[100] ensures it covers all page elements */}
        <AnimatePresence>
          {showLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-100 bg-black/90 flex flex-col items-center justify-center p-4"
            >
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>

              <div className="relative w-full max-w-4xl h-[50vh] sm:h-[60vh] flex items-center justify-center">
                <button
                  onClick={() =>
                    setActiveImage(
                      (prev) => (prev - 1 + images.length) % images.length,
                    )
                  }
                  className="absolute left-2 sm:left-4 text-white hover:text-gray-300 transition-colors"
                >
                  <ChevronLeft size={40} />
                </button>

                <img
                  src={images[activeImage]}
                  alt="Full size view"
                  className="max-h-full w-full object-contain px-10"
                />

                <button
                  onClick={() =>
                    setActiveImage((prev) => (prev + 1) % images.length)
                  }
                  className="absolute right-2 sm:right-4 text-white hover:text-gray-300 transition-colors"
                >
                  <ChevronRight size={40} />
                </button>
              </div>

              <div className="flex gap-3 mt-6 sm:mt-8 overflow-x-auto max-w-full px-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 border-2 shrink-0 overflow-hidden rounded-lg ${
                      activeImage === idx
                        ? "border-white"
                        : "border-transparent opacity-60"
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumb"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Gallery Section */}
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-3xl h-75 sm:h-87.5 w-full flex items-center justify-center relative overflow-hidden border border-slate-100">
              <button
                onClick={() => setShowLightbox(true)}
                className="w-full h-full flex items-center justify-center cursor-zoom-in"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={images[activeImage]}
                    alt={item.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-[60%] max-h-[60%] object-contain"
                  />
                </AnimatePresence>
              </button>

              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  -{discountPercent}%
                </span>
              )}

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md hover:scale-105 transition-transform z-10"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-slate-400"
                  }`}
                />
              </button>
              <button
                onClick={() => setShowLightbox(true)}
                className="absolute bottom-4 right-4 p-2.5 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <Maximize2 className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all bg-slate-50 ${
                    activeImage === idx
                      ? "border-brand-orange"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt="Thumb"
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 leading-tight">
              {item.name}
            </h1>

            <div className="text-sm text-slate-500 mb-6 font-medium space-y-1">
              <p>
                Product Code:{" "}
                <span className="text-brand-black font-semibold">
                  {item.productCode}
                </span>
              </p>
              <p>
                Brand:{" "}
                <span className="text-brand-black font-semibold">
                  {item.brand}
                </span>
              </p>
            </div>

            {/* Color Picking Circles */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-brand-black">
                  Color:
                </span>
                <span className="text-sm font-medium text-slate-600">
                  {selectedColor.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-8 h-8 rounded-full transition-all relative flex items-center justify-center shadow-sm cursor-pointer ${
                        color.border
                          ? `border border-[${color.border}]`
                          : "border border-black/10"
                      } ${
                        isSelected
                          ? "ring-2 ring-brand-orange ring-offset-2 scale-110"
                          : "hover:scale-105"
                      }`}
                      title={color.name}
                    >
                      {isSelected && (
                        <Check
                          size={14}
                          className={
                            color.hex === "#f8fafc"
                              ? "text-slate-800"
                              : "text-white"
                          }
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-3 mb-8 pb-6 border-b border-slate-100">
              <span className="text-3xl md:text-4xl font-bold text-brand-black">
                ₦{item.price.toLocaleString()}
              </span>
              {item.oldPrice && (
                <span className="text-lg text-slate-400 line-through">
                  ₦{item.oldPrice.toLocaleString()}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-brand-black">
                  Quantity:
                </span>
                <div className="flex items-center bg-slate-50 rounded-full border border-slate-200 p-1">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors font-bold text-sm text-slate-600 shadow-sm cursor-pointer"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 font-bold min-w-10 text-center text-brand-black text-sm">
                    {qty}
                  </span>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors font-bold text-sm text-slate-600 shadow-sm cursor-pointer"
                    onClick={() => setQty(qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-brand-orange text-white rounded-full font-bold hover:bg-orange-600 shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center text-center gap-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Truck className="w-5 h-5 text-brand-orange" />
                <span className="text-xs font-semibold text-slate-600">
                  Free Delivery
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <span className="text-xs font-semibold text-slate-600">
                  100% Authentic
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <RotateCcw className="w-5 h-5 text-brand-orange" />
                <span className="text-xs font-semibold text-slate-600">
                  Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-brand-black mb-6">
            Product Description
          </h3>
          <p className="text-slate-600 leading-relaxed max-w-4xl">
            {item.fullDescription}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
