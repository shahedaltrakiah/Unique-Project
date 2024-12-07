import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const getCartItems = () => {
    return JSON.parse(Cookies.get("cart") || "[]");
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = getCartItems().filter((item) => item.id !== productId);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
    setCartItems(updatedCart);
  };

  useEffect(() => {
    const cartData = getCartItems();
    if (cartData && cartData.length > 0) {
      setCartItems(cartData);
    } else {
      setCartItems([]);
    }
  }, []);

  return (
    <div>
      <form className="bg0 p-t-40 p-b-85">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-10 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <tr className="table_head">
                      <th className="column-1">Product</th>
                      <th className="column-2">Name</th>
                      <th className="column-3">Price</th>
                      <th className="column-4">Total</th>
                      <th className="column-5">Remove</th>
                    </tr>

                    {cartItems.map((item) => (
                      <tr className="table_row" key={item.id}>
                        <td className="column-1">
                          <div className="how-itemcart1">
                            <img src={`assets/images/${item.image}`}alt={item.name} />
                          </div>
                        </td>
                        <td className="column-2">{item.name}</td>
                        <td className="column-3">{item.price}</td>
                        <td className="column-4">{item.price}</td>
                        <td className="column-5">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="btn-remove"
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>

            <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div className="bor10 p-lr-40 p-t30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

                <div className="flex-w flex-t bor12 p-b-13">
                  <div className="size-208">
                    <span className="stext-110 cl2">Subtotal:</span>
                  </div>
                  <div className="size-209">
                    <span className="mtext-110 cl2">
                      JOD{" "}
                      {cartItems
                        .reduce(
                          (total, item) => total + parseFloat(item.price),
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                  <div className="size-208 w-full-ssm">
                    <span className="stext-110 cl2">Shipping:</span>
                  </div>

                  <div className="size-209">
                    <span className="mtext-110 cl2">JOD 2.0</span>
                  </div>
                </div>

                <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                  <div className="size-208 w-full-ssm">
                    <span className="stext-110 cl2">Total:</span>
                  </div>

                  <div className="size-209">
                    <span className="mtext-110 cl2">
                      JOD{" "}
                      {(
                        cartItems.reduce(
                          (total, item) => total + parseFloat(item.price),
                          0
                        ) + 2
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="size-209">
                  <button
                    className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Cart;
