import React from "react";
import { useCart } from "./CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

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
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-slate-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center mt-20 text-slate-400">
              Your cart is feeling a bit empty!
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 bg-slate-100 rounded-lg flex-shrink-0" />{" "}
                {/* Product Thumb */}
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-brand-blue font-semibold text-sm">
                    ₦{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded-full px-2 py-0.5">
                      <button
                        onClick={() => addToCart(item, -1)}
                        className="p-1 hover:text-brand-orange"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="p-1 hover:text-brand-orange"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t bg-slate-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-slate-600">Subtotal</span>
              <span className="text-2xl font-bold text-brand-black">
                ₦{getSubtotal().toLocaleString()}
              </span>
            </div>
            <button className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200">
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
