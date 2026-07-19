import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShoppingCart,
  ArrowRight,
  ImageOff,
} from "lucide-react";

const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    addToCart,
    isCartOpen,
    toggleCart,
    getSubtotal,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60]"
            onClick={toggleCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Your Cart
              {cart.length > 0 && (
                <span className="text-xs font-bold bg-brand-orange text-white w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={toggleCart}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product List / Empty State */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                  <ShoppingCart className="w-10 h-10 text-slate-300" />
                </div>
                <span className="absolute top-1 right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange/30 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-orange" />
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-slate-400 max-w-[280px] mb-8 leading-relaxed">
                Looks like you haven't added anything yet. Let's find some
                amazing tech.
              </p>

              <button
                onClick={toggleCart}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group"
              >
                Start Shopping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-3 p-3 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Product Thumb */}
                    <div className="w-20 h-20 bg-slate-50 rounded-xl flex-shrink-0 border border-slate-100 overflow-hidden flex items-center justify-center">
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageOff className="w-6 h-6 text-slate-300" />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm text-slate-800 truncate">
                            {item.name}
                          </h3>
                          <p className="text-brand-orange font-bold text-sm mt-0.5">
                            ₦{item.price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-200 rounded-full bg-white overflow-hidden">
                          <button
                            onClick={() => addToCart(item, -1)}
                            className="p-1.5 text-slate-500 hover:text-brand-orange hover:bg-slate-50 transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-6 text-center text-slate-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item, 1)}
                            className="p-1.5 text-slate-500 hover:text-brand-orange hover:bg-slate-50 transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-semibold text-slate-400">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer Pricing & CTA */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-slate-100 bg-white">
            <div className="flex justify-between items-center mb-5">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                  Subtotal
                </span>
                <span className="text-xs text-slate-400">
                  Taxes calculated at checkout
                </span>
              </div>
              <span className="text-2xl font-black text-slate-900">
                ₦{getSubtotal().toLocaleString()}
              </span>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-orange-100 active:scale-[0.99]">
              <ShoppingBag className="w-4 h-4" />
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
