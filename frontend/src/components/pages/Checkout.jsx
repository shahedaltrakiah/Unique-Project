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
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const token = localStorage.getItem("auth_token");

  // Fetch cart items and user info from cookies when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(Cookies.get("cart") || "[]");
    setCartItems(storedCart);
    if (token) {
      apiService
        .getUserData(token) // Pass the token to get user data
        .then((data) => {
          console.log("User Data:", data); // Log the fetched data to confirm it's being received
          // Ensure we are setting the user data correctly here
          setUserData({
            name: data.data.name,
            email: data.data.email,
            phone: data.data.phone,
            address: data.data.address,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data.");
          setLoading(false);
        });
    } else {
      setError("Missing auth_token.");
      setLoading(false);
    }
  }, [token]);

  // Calculate Subtotal from cart items
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    const productIds = cartItems.map((item) => item.id);

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
      const response = await apiService.placeOrder({ products: productIds });

      if (response) {
          Cookies.remove("cart");
          window.location.href = "/thankyou";
      } else {
        console.log("Failed response:", response);
        Swal.fire({
          icon: "error",
          title: "Failed to place order",
          text: response?.message || "Unknown error",
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                    disabled
                    value={userData.name}
                    onChange={handleInputChange} // Adding state
                    placeholder="Name"
                  />
                </div>

                {/* Email */}
                <div className="bor8 bg0 m-b-20">
                  <input
                    className="stext-111 cl8 plh3 size-111 p-lr-15"
                    type="email"
                    name="email"
                    disabled
                    value={userData.email}
                    onChange={handleInputChange} // Adding state
                    placeholder="Email Address"
                  />
                </div>

                {/* Phone Number */}
                <div className="bor8 bg0 m-b-20">
                  <input
                    className="stext-111 cl8 plh3 size-111 p-lr-15"
                    type="text"
                    name="phone"
                    disabled
                    value={userData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                  />
                </div>

                {/* Address */}
                <div className="bor8 bg0 m-b-12">
                  <input
                    className="stext-111 cl8 plh3 size-111 p-lr-15"
                    type="text"
                    name="address"
                    disabled
                    value={userData.address}
                    onChange={handleInputChange} // Adding state
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 className="mtext-109 cl2">Your Order</h4>

                {/* Display the products in the cart */}
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex-w flex-t bor12 p-b-13 p-t-20"
                    >
                      <div className="size-208">
                        <span className="stext-110 cl2 p-b-20">
                          {item.name}
                        </span>
                      </div>
                      <div className="size-209">
                        <span
                          className="mtext-110 cl2"
                          style={{ marginLeft: "90px" }}
                        >
                          {item.price.toFixed(2)}JD
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
                    <span
                      className="mtext-110 cl2"
                      style={{ marginLeft: "90px" }}
                    >
                      {calculateSubtotal()}JD
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
