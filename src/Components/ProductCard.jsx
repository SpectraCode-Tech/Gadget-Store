import React, { useState } from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom"; // 1. Import Link
import { useCart } from "./CartContext";
import productPlaceholder from "../assets/slide1.jpeg";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const colors = ["bg-blue-600", "bg-slate-800", "bg-orange-500"];

  return (
    <div className="w-full bg-white p-4 border border-slate-100 hover:shadow-lg transition-all duration-300 rounded-3xl flex flex-col">
      {/* 2. Wrap the image and title in Link */}
      <Link to={`/product/${product.id}`} className="block flex-1">
        <div className="w-full aspect-square bg-slate-50 rounded-2xl mb-4 overflow-hidden">
          <img
            src={productPlaceholder}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <h3 className="font-bold text-brand-black text-base mb-2 truncate">
          {product.name}
        </h3>
      </Link>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-slate-400 line-through text-xs md:text-sm">
          ₦{product.oldPrice.toLocaleString()}
        </span>
        <span className="text-brand-blue font-bold text-sm md:text-xl">
          ₦{product.price.toLocaleString()}
        </span>
      </div>

      <div className="flex gap-2 mb-6">
        {colors.map((color, idx) => (
          <button
            key={idx}
            className={`w-5 h-5 rounded-full ${color} border-2 border-white ring-1 ring-slate-200`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto z-10">
        <div className="flex items-center gap-2 border border-slate-200 rounded-full px-2 py-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-slate-500 hover:text-brand-blue"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-semibold text-brand-black w-6 text-center text-sm">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="text-slate-500 hover:text-brand-blue"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent navigating when clicking cart
            addToCart(product, quantity);
          }}
          className="relative bg-brand-orange text-white p-3 rounded-full hover:bg-orange-600 transition shadow-sm"
        >
          <ShoppingBag className="w-5 h-5" />
          <Plus className="w-3 h-3 absolute top-2 right-1.5 bg-brand-orange rounded-full border border-white" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
