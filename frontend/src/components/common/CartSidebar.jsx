import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function CartSidebar() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from cookies
  const getCartItems = () => {
    return JSON.parse(Cookies.get("cart") || "[]");
  };

  // Function to update cart state dynamically
  const updateCartItems = () => {
    const cartData = getCartItems();
    setCartItems(cartData);
  };

  // Update cart state on component mount and when cookies change
  useEffect(() => {
    updateCartItems();

    // Set up an interval to monitor cookie changes (if not using a state management library)
    const interval = setInterval(() => {
      const currentCart = getCartItems();
      if (JSON.stringify(currentCart) !== JSON.stringify(cartItems)) {
        setCartItems(currentCart);
      }
    }, 500); // Check every 500ms

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [cartItems]);

  // Add a function to remove an item from the cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    Cookies.set("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  return (
    <div className="wrap-header-cart js-panel-cart">
      <div className="s-full js-hide-cart"></div>
      <div className="header-cart flex-col-l p-l-65 p-r-25">
        <div className="header-cart-title flex-w flex-sb-m p-b-8">
          <span className="mtext-103 cl2">Your Cart</span>
          <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
            <i className="zmdi zmdi-close"></i>
          </div>
        </div>

        <div className="header-cart-content flex-w js-pscroll">
          <ul className="header-cart-wrapitem w-full">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li className="header-cart-item flex-w flex-t m-b-12" key={item.id}>
                  <div className="header-cart-item-img">
                    <img src={`assets/images/${item.image}`} alt={item.name} />
                    <button
                      className="remove-item-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      X
                    </button>
                  </div>
                  <div className="header-cart-item-txt p-t-8">
                    <a
                      href="#"
                      className="header-cart-item-name m-b-18 hov-cl1 trans-04"
                    >
                      {item.name}
                    </a>
                    <span className="header-cart-item-info">{item.price}JD</span>
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
                .toFixed(2)}JD
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
