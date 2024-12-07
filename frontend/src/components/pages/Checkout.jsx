import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import the Cookies library
import apiService from "../../services/API";

function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [cartItems, setCartItems] = useState([]); // State for cart items

  // Fetch cart items and user info from cookies when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(Cookies.get("cart") || "[]");
    const user = JSON.parse(Cookies.get("user") || "{}");

    setCartItems(storedCart);
    setName(user.name || "");
    setEmail(user.email || "");
    setAddress(user.address || "");
  }, []);

  // Calculate Subtotal from cart items
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price,
      0
    ).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    // استخراج معرّفات المنتجات فقط من العربة
    const productIds = cartItems.map(item => item.id);
  
    const orderData = {
      name,
      address,
      payment_method: paymentMethod,
      email,
      phone: document.querySelector('input[name="phone"]').value,
      items: productIds,
    };
  
    try {
      // Log the order data for debugging
      console.log("Product IDs:", productIds);
  
      const response = await apiService.placeOrder({ products: productIds });
      console.log("API response:", response);
  
      if (response && response.message === "Order placed successfully") {
        alert("Order placed successfully!");
        Cookies.remove("cart");
      } else {
        console.log("Failed response:", response);
        alert("Failed to place order: " + (response?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing your order. Please try again.");
    }
  };

  return (
    <div>
      {/* Checkout Form */}
      <form className="bg0 p-t-40 p-b-85">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <h4 className="mtext-109 cl2 p-b-30">Checkout</h4>

                {/* Name */}
                <div className="bor8 bg0 m-b-20">
                  <input
                    className="stext-111 cl8 plh3 size-111 p-lr-15"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Adding state
                    placeholder="Name"
                  />
                </div>

                {/* Email */}
                <div className="bor8 bg0 m-b-20">
                  <input
                    className="stext-111 cl8 plh3 size-111 p-lr-15"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Adding state
                    placeholder="Email Address"
                  />
                </div>

                {/* Phone Number */}
                <div className="bor8 bg0 m-b-20">
                  <input
                    className="stext-111 cl8 plh3 size-111 p-lr-15"
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                  />
                </div>

                {/* Toggle for Adding a Different Phone Number */}
                <div className="flex-w p-t-15 p-b-15">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={showPhoneNumber}
                      onChange={() => setShowPhoneNumber(!showPhoneNumber)}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="stext-111 cl8 m-l-15">
                    Add a different phone number
                  </span>
                </div>

                {/* Conditional Additional Phone Number Field */}
                {showPhoneNumber && (
                  <div className="bor8 bg0 m-b-20">
                    <input
                      className="stext-111 cl8 plh3 size-111 p-lr-15"
                      type="text"
                      name="altPhone"
                      placeholder="Alternate Phone Number"
                    />
                  </div>
                )}

                {/* Address */}
                <div className="bor8 bg0 m-b-12">
                  <label htmlFor="address" className="stext-111 cl8 p-b-5">
                    Address
                  </label>
                  <input
                    className="stext-111 cl8 plh3 size-115 p-lr-15 h-36"
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} // Adding state
                    placeholder=""
                  />
                </div>

                {/* Toggle for Adding a Different Address */}
                <div className="flex-w p-t-15 p-b-15">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={showAddress}
                      onChange={() => setShowAddress(!showAddress)}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="stext-111 cl8 m-l-15">
                    Add a different address
                  </span>
                </div>

                {/* Conditional Additional Address Field */}
                {showAddress && (
                  <div className="bor8 bg0 m-b-12">
                    <textarea
                      className="stext-111 cl8 plh3 size-115 p-lr-15 h-100"
                      name="altAddress"
                      placeholder="Enter alternative address"
                    ></textarea>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 className="mtext-109 cl2 p-b-30">Your Order</h4>

                {/* Display the products in the cart */}
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div key={index} className="flex-w flex-t bor12 p-b-13">
                      <div className="size-208">
                        <span className="stext-110 cl2 p-b-20">{item.name}</span>
                      </div>
                      <div className="size-209">
                        <span className="mtext-110 cl2" style={{ marginLeft: "90px" }}>
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products in the cart.</p>
                )}

                {/* Total */}
                <div className="flex-w flex-t p-t-27 p-b-33">
                  <div className="size-208">
                    <span className="mtext-101 cl2">Total:</span>
                  </div>
                  <div className="size-209 p-t-1">
                    <span className="mtext-110 cl2" style={{ marginLeft: "90px" }}>
                      ${calculateSubtotal()}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                  onClick={handlePlaceOrder} // Attach the order placement function
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
