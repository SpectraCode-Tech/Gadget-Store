import React, { useState } from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const colors = ["bg-blue-600", "bg-slate-800", "bg-orange-500"];

  return (
    <div className="w-full bg-white p-4 border-r border-b border-slate-200 hover:bg-slate-50 transition-colors flex flex-col">
      {/* Product Image */}
      <div className="w-full aspect-square bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-slate-400 text-sm">Image</span>
      </div>

      <h3 className="font-bold text-brand-black text-base mb-2 truncate">
        {product.name}
      </h3>

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
            className={`w-5 h-5 md:w-6 md:h-6 rounded-full ${color} border-2 border-white ring-1 ring-slate-200`}
          />
        ))}
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
            onClick={() => setQuantity((q) => q + 1)}
            className="text-slate-500 hover:text-brand-blue transition"
          >
            <Plus className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product, quantity)}
          className="relative bg-brand-orange text-white p-2 md:p-3 rounded-full hover:bg-orange-600 transition shadow-sm"
        >
          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
          <Plus className="w-2.5 h-2.5 md:w-3 md:h-3 absolute top-1.5 right-1 md:top-2 md:right-1.5 bg-brand-orange rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
