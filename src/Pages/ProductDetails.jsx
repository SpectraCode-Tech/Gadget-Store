import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../Components/CartContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
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
  AlertCircle,
} from "lucide-react";
import productPlaceholder from "../assets/slide1.jpeg";

const ProductDetails = () => {
  // 1. Grab dynamic routing ID parameter from React Router path
  const { id } = useParams();
  const { addToCart } = useCart();

  // React Component Lifecycle States
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  // 2. Fetch live data from backend MongoDB server on load
  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        const productData = res.data;
        setItem(productData);

        // Auto-select the first color in the backend string array on load
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed fetching item specifications:", err);
        setError("Could not resolve product technical specifications.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">
        Assembling product specifications matrix...
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 font-medium gap-3">
        <AlertCircle className="w-8 h-8" />
        <p>{error || "Product configurations not found."}</p>
        <Link
          to="/"
          className="text-sm text-brand-orange font-bold hover:underline"
        >
          Return to store home
        </Link>
      </div>
    );
  }

  // 3. Resolve Media Paths (Falls back to local file if stock hit 0 or images are empty)
  const images =
    item.images && item.images.length > 0
      ? item.images
      : [productPlaceholder];

  // 4. Calculate pricing discount metrics on the fly (base price + discount value = old price)
  const basePrice = item.price || 0;
  const historicOldPrice = basePrice + (item.discount || 0);
  const discountPercent =
    item.discount > 0
      ? Math.round((item.discount / historicOldPrice) * 100)
      : 0;

  const handleAddToCartSubmit = () => {
    addToCart(
      {
        ...item,
        img: images[0],
        // Send chosen variants to frontend cart memory snapshot
        selectedColor: selectedColor || "Standard",
      },
      qty
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* LIGHTBOX MODAL OVERLAY */}
        <AnimatePresence>
          {showLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4"
            >
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors cursor-pointer"
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
                  className="absolute left-2 sm:left-4 text-white hover:text-gray-300 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={40} />
                </button>

                <img
                  src={images[activeImage]}
                  alt="Full viewport layout preview"
                  className="max-h-full w-full object-contain px-10"
                />

                <button
                  onClick={() =>
                    setActiveImage((prev) => (prev + 1) % images.length)
                  }
                  className="absolute right-2 sm:right-4 text-white hover:text-gray-300 transition-colors cursor-pointer"
                >
                  <ChevronRight size={40} />
                </button>
              </div>

              {/* Lightbox Thumbnails selection grid */}
              <div className="flex gap-3 mt-6 sm:mt-8 overflow-x-auto max-w-full px-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 border-2 shrink-0 overflow-hidden rounded-lg cursor-pointer ${
                      activeImage === idx
                        ? "border-brand-orange"
                        : "border-transparent opacity-60"
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumb snapshot"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CORE SPECIFICATIONS GRID PANELS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* LEFT PANEL: Media Content Galleries */}
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
                  -{discountPercent}% OFF
                </span>
              )}

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md hover:scale-105 transition-transform z-10 cursor-pointer"
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
                className="absolute bottom-4 right-4 p-2.5 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors cursor-pointer"
              >
                <Maximize2 className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Flat Thumbnail Track list */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all bg-slate-50 cursor-pointer ${
                    activeImage === idx
                      ? "border-brand-orange"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt="Thumb shortcut track"
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: Metadata Text Descriptions & Actions */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 leading-tight">
              {item.name}
            </h1>

            <div className="text-sm text-slate-500 mb-6 font-medium space-y-1">
              <p>
                Product Code:{" "}
                <span className="text-brand-black font-semibold">
                  {item.code}
                </span>
              </p>
              <p>
                Brand Vendor:{" "}
                <span className="text-brand-black font-semibold">
                  {item.brand}
                </span>
              </p>
              <p>
                Category Catalog:{" "}
                <span className="text-brand-black font-semibold uppercase text-xs">
                  {item.category}
                </span>
              </p>
              <p>
                Condition State:{" "}
                <span className="text-brand-black font-semibold uppercase text-xs">
                  {item.condition}
                </span>
              </p>
              <p>
                Warehouse Inventory:{" "}
                <span
                  className={`font-bold ${
                    item.stock > 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {item.stock > 0 ? `${item.stock} Units Left` : "Out of stock"}
                </span>
              </p>
            </div>

            {/* Pricing Section blocks */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-extrabold text-brand-blue">
                ₦{basePrice.toLocaleString()}
              </span>
              {item.discount > 0 && (
                <span className="text-slate-400 line-through text-sm md:text-base">
                  ₦{historicOldPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* DYNAMIC BACKGROUND COLOR VARIATIONS SELECTOR TRACK */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-brand-black">
                  Select Finish:
                </span>
                <span className="text-sm font-medium text-slate-600">
                  {selectedColor || "None Chosen"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {item.colors && item.colors.length > 0 ? (
                  item.colors.map((hexColorString, idx) => {
                    const isSelected = selectedColor === hexColorString;
                    const isLightColor = [
                      "#f8fafc",
                      "#ffffff",
                      "#fff",
                    ].includes(hexColorString?.toLowerCase());

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColor(hexColorString)}
                        style={{ backgroundColor: hexColorString }}
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all shadow-sm hover:scale-110 flex items-center justify-center ${
                          isSelected
                            ? "border-brand-orange ring-2 ring-brand-orange/30 scale-105"
                            : "border-white ring-1 ring-slate-200"
                        }`}
                        title={hexColorString}
                      >
                        {isSelected && (
                          <Check
                            size={14}
                            className={
                              isLightColor ? "text-slate-800" : "text-white"
                            }
                          />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <span className="text-xs text-slate-400">
                    Standard Baseline Variant Monolith
                  </span>
                )}
              </div>
            </div>

            {/* QUANTITY CONTROL BAR & ADD BUTTON ROW ACCUMULATOR */}
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-brand-black">
                  Quantity:
                </span>
                <div className="flex items-center bg-slate-50 rounded-full border border-slate-200 p-1">
                  <button
                    disabled={qty <= 1}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors font-bold text-sm text-slate-600 shadow-sm disabled:opacity-35 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold min-w-10 text-center text-brand-black text-sm">
                    {qty}
                  </span>
                  <button
                    disabled={item.stock !== undefined && qty >= item.stock}
                    onClick={() => setQty((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors font-bold text-sm text-slate-600 shadow-sm disabled:opacity-35 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCartSubmit}
                  disabled={item.stock <= 0}
                  className="px-6 py-3 bg-brand-orange text-white rounded-full font-bold hover:bg-orange-600 shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>

            {/* Trust and logistics value indicators */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center text-center gap-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Truck className="w-5 h-5 text-brand-orange" />
                <span className="text-xs font-semibold text-slate-600">
                  Nationwide Dispatch
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

        {/* Extended Product Specifications text string descriptions */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-brand-black mb-6">
            Product Specifications Description
          </h3>
          <p className="text-slate-600 leading-relaxed max-w-4xl whitespace-pre-line">
            {item.description}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
