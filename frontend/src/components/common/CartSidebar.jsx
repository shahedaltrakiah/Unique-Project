import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function CartSidebar() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from cookies
  const getCartItems = () => JSON.parse(Cookies.get("cart") || "[]");

  // Update cookies after state changes
  const setCartItemsToCookies = (items) => {
    Cookies.set("cart", JSON.stringify(items)); // No expiration here
  };

  // Add item to the cart
  const addItemToCart = (newItem) => {
    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    setCartItemsToCookies(updatedCart); // Update cookies immediately
  };

  // Remove item from the cart
  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    setCartItemsToCookies(updatedCart); // Update cookies immediately
  };

  // Load cart from cookies on initial render
  useEffect(() => {
    const cartData = getCartItems();
    setCartItems(cartData); // Set initial cart data in state
  }, []); // This runs only once on component mount

  // Calculate the total price
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

  return (
    <div className="wrap-header-cart js-panel-cart">
      <div className="s-full js-hide-cart"></div>
      <div className="header-cart flex-col-l p-l-65 p-r-25">
        <div className="header-cart-title flex-w flex-sb-m p-b-8">
          <span className="mtext-103 cl2">Your Cart</span>
          <div
            className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart"
            onClick={() => setCartItems([])} // Clear the cart when the close icon is clicked
          >
            <i className="zmdi zmdi-close"></i>
          </div>
        </div>

        <div className="header-cart-content flex-w js-pscroll">
          <ul className="header-cart-wrapitem w-full">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li className="header-cart-item flex-w flex-t m-b-12" key={item.id}>
                  <div className="header-cart-item-img">
                    <img src={`${item.image}`} alt={item.name} />
                  </div>
                  <div className="header-cart-item-txt p-t-8">
                    <a
                      href="#"
                      className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                    >
                      {item.name}
                    </a>
                    <span className="header-cart-item-info">{item.price} JD</span>
                    <div
                      className="remove-item"
                      onClick={() => removeItemFromCart(item.id)} // Remove item on click
                    >
                      <i className="zmdi zmdi-delete"></i> Remove
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>Your cart is empty!</p>
            )}
          </ul>

          <div className="w-full">
            <div className="header-cart-total w-full p-tb-40">
              Total:{" "}
              {cartItems
                .reduce((total, item) => total + parseFloat(item.price), 0)
                .toFixed(2)}{" "}
              JD
            </div>

            <div className="header-cart-buttons flex-w w-full">
              <a
                href="/cart"
                className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
              >
                View Cart
              </a>
              <a
                href="/checkout"
                className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
              >
                Check Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSidebar;
