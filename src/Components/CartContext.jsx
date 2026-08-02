import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Lazy initializer: Load from localStorage only on the first render
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("sentinel_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sentinel_cart", JSON.stringify(cart));
  }, [cart]);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (product, quantityChange) => {
    // Normalize unique identifiers between frontend mock ids and MongoDB _id models
    const targetId = product._id || product.id;

    setCart((prev) => {
      const existing = prev.find((item) => (item._id || item.id) === targetId);

      if (existing) {
        const newQuantity = existing.quantity + quantityChange;

        // Remove item from cart if the calculated total quantity drops to 0 or lower
        if (newQuantity <= 0) {
          return prev.filter((item) => (item._id || item.id) !== targetId);
        }

        // CRITICAL INVENTORY GUARD: Stop user from surpassing live stock availability limits
        if (product.stock && newQuantity > product.stock) {
          alert(
            `Cannot add more items. Only ${product.stock} units are left in active inventory.`,
          );
          return prev;
        }

        return prev.map((item) =>
          (item._id || item.id) === targetId
            ? { ...item, quantity: newQuantity }
            : item,
        );
      }

      // Safeguard to guarantee initial additions never exceed total database availability
      if (product.stock && quantityChange > product.stock) {
        alert(
          `Only ${product.stock} items are available. Adjusting quantity to match maximum stock limits.`,
        );
        return [...prev, { ...product, quantity: product.stock }];
      }

      return [...prev, { ...product, quantity: Math.max(1, quantityChange) }];
    });
  };

  const removeFromCart = (id) => {
    // Structural filter checking both native database keys and fallback mock string parameters
    setCart((prev) => prev.filter((item) => (item._id || item.id) !== id));
  };

  // NEW: Erase local cache values from storage once a purchase completes successfully
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("sentinel_cart");
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart, // Exported to reset cart memory after order placement is successful
        getSubtotal,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
