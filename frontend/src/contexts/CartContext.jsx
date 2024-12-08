import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create the context
export const CartContext = createContext();

// Provide the context
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from cookies on initial render
  useEffect(() => {
    const cartData = JSON.parse(Cookies.get("cart") || "[]");
    setCartItems(cartData);
  }, []);

  // Update cookies whenever cart changes
  const updateCartCookies = (items) => {
    Cookies.set("cart", JSON.stringify(items), { expires: 7 });
  };

  // Add item to cart
  const addItemToCart = (item) => {
    const exists = cartItems.some((cartItem) => cartItem.id === item.id);
    if (!exists) {
      const updatedCart = [...cartItems, item];
      setCartItems(updatedCart);
      updateCartCookies(updatedCart);
    }
  };

  // Remove item from cart
  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    updateCartCookies(updatedCart);
  };

  // Calculate total items in the cart
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
