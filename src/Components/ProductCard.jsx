import React, { useState } from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import productPlaceholder from "../assets/slide1.jpeg";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Handle unique item database identifiers cleanly
  const productId = product._id || product.id;

  // Re-calculate the old price dynamically based on your schema layout: base price + discount value
  const basePrice = product.price || 0;
  const calculatedOldPrice = basePrice + (product.discount || 0);

  // NEW: Calculate the real math markdown discount percent on the fly
  const discountPercent =
    product.discount > 0 && calculatedOldPrice > 0
      ? Math.round((product.discount / calculatedOldPrice) * 100)
      : 0;

  // If your backend colors array is populated, map them directly. Otherwise, fall back to default Tailwind tags.
  const visualColors =
    product.colors && product.colors.length > 0
      ? product.colors
      : ["slate-800", "blue-600", "orange-500"];

  // Resolve Cloudinary paths if present, otherwise fall back to slide1 image asset
  const imageSource =
    product.images && product.images.length > 0
      ? product.images[0]
      : productPlaceholder;

  return (
    <div className="w-full bg-white p-4 border-r border-b border-slate-200 hover:bg-slate-50 transition-colors flex flex-col">
      <Link to={`/product/${productId}`} className="block flex-1">
        {/* IMAGE CONTAINER CONTAINER WRAPPED WITH RELATIVE PARAMETERS */}
        <div className="relative w-full aspect-square bg-slate-100 rounded-lg mb-4 overflow-hidden group">
          <img
            src={imageSource}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* DYNAMIC TOP-LEFT DISCOUNT BADGE OVERLAY */}
          {discountPercent > 0 && (
            <span className="absolute top-2 left-2 bg-brand-orange text-white text-[10px] md:text-xs font-black px-2 py-1 rounded-full shadow-sm z-10 animate-fade-in">
              -{discountPercent}%
            </span>
          )}
        </div>

        <h3 className="font-bold text-brand-black text-base mb-2 truncate">
          {product.name}
        </h3>
      </Link>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {product.discount > 0 && (
          <span className="text-slate-400 line-through text-xs md:text-sm">
            ₦{calculatedOldPrice.toLocaleString()}
          </span>
        )}
        <span className="text-brand-blue font-bold text-sm md:text-xl">
          ₦{basePrice.toLocaleString()}
        </span>
      </div>

      <div className="flex gap-2 mb-6">
        {visualColors.map((color, idx) => {
          // Detect if color entry is a class name or regular color name string
          const isClassName = color.startsWith("bg-");
          return (
            <button
              key={idx}
              disabled
              style={!isClassName ? { backgroundColor: color } : {}}
              className={`w-5 h-5 md:w-6 md:h-6 rounded-full ${isClassName ? color : ""} border-2 border-white ring-1 ring-slate-200`}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-auto">
        {/* Quantity Selector */}
        <div className="flex items-center gap-2 md:gap-3 border border-slate-200 rounded-full px-2 py-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-slate-500 hover:text-brand-blue transition"
          >
            <Minus className="w-3 h-3 md:w-4 md:h-4" />
          </button>
          <span className="font-semibold text-brand-black w-4 md:w-6 text-center text-sm">
            {quantity}
          </span>
          <button
            // Cap quantity additions at maximum warehouse availability numbers
            onClick={() =>
              setQuantity((q) =>
                product.stock && q >= product.stock ? q : q + 1,
              )
            }
            className="text-slate-500 hover:text-brand-blue transition"
          >
            <Plus className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product, quantity)}
          className="relative cursor-pointer bg-brand-orange text-white p-2 md:p-3 rounded-full hover:bg-orange-600 transition shadow-sm"
        >
          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
          <Plus className="w-2.5 h-2.5 md:w-3 md:h-3 absolute top-1.5 right-1 md:top-2 md:right-1.5 bg-brand-orange rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
