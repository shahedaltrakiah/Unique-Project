import React, { useState, useEffect } from "react";
import apiService from "../../services/API";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Cart items state

  // Fetch the wishlist from the server
  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getWishlist();
      console.log("Wishlist Response:", response);
      if (response.data && response.data.favorites) {
        setWishlist(response.data.favorites);
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  };

  // Get cart items from cookies
  const getCartItems = () => JSON.parse(Cookies.get("cart") || "[]");
  const handleAddToCart = (product) => {
    try {
      let cart = getCartItems();
      const existingProduct = cart.find((item) => item.id === product.id);

      if (!existingProduct) {
        cart.push(product); // Add the full product to the cart
        Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
        setCartItems(cart); // Update cart items state

        Swal.fire({
          title: "Product Added!",
          text: "The product has been added to your cart successfully.",
          icon: "success",
          timer: 6500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Product Already in Cart",
          text: "This product is already in your cart.",
          icon: "info",
          timer: 6500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding the product to your cart. Please try again.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  const handleRemoveFromWishlist = async (productId, event) => {
    event.preventDefault();
    console.log("Remove button clicked for product ID:", productId);

    const token = localStorage.getItem("auth_token");
    if (!token) {
      Swal.fire({
        title: "Please log in to remove from favorites!",
        icon: "warning",
        confirmButtonText: "Log In",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    try {
      const response = await apiService.removeFromWishlist(productId);
      console.log("API Response:", response);

      if (
        response &&
        response.data &&
        response.data.message === "Product removed from favorites"
      ) {
        fetchWishlist();
        Swal.fire({
          title: "Product removed from favorites!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Failed to remove product from favorites.",
          icon: "error",
          showConfirmButton: true,
        });
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      Swal.fire({
        title: "Failed to remove product from favorites.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    console.log(wishlist);
  }, [wishlist]);

  return (
    <div>
      {/* Wishlist */}
      <form className="bg0 p-t-40 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 m-lr-auto m-b-50">
              <div className="m-l-20 m-r-20 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <thead>
                      <tr className="table_head">
                        <th
                          className="column-1"
                          style={{ textAlign: "center" }}
                        >
                          Product Image
                        </th>
                        <th
                          className="column-2"
                          style={{ textAlign: "center" }}
                        >
                          Product Name
                        </th>
                        <th
                          className="column-3"
                          style={{ textAlign: "center" }}
                        >
                          Unit Price
                        </th>
                        <th
                          className="column-4"
                          style={{ textAlign: "center" }}
                        >
                          Add
                        </th>
                        <th
                          className="column-5"
                          style={{ textAlign: "center" }}
                        >
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            Loading...
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td
                            colSpan="5"
                            style={{ color: "red", textAlign: "center" }}
                          >
                            {error}
                          </td>
                        </tr>
                      ) : (
                        wishlist.map((favorite) => (
                          <tr className="table_row" key={favorite.id}>
                            <td
                              className="column-1"
                              style={{ textAlign: "center" }}
                            >
                              <div className="how-itemcart1">
                                <img
                                  src={`${favorite.product.image}`}
                                  alt={favorite.product.name}
                                  style={{ marginLeft: "30px" }}
                                />
                              </div>
                            </td>
                            <td
                              className="column-2"
                              style={{ textAlign: "center" }}
                            >
                              {favorite.product.name.charAt(0).toUpperCase() +
                                favorite.product.name.slice(1)}
                            </td>
                            <td
                              className="column-3"
                              style={{ textAlign: "center" }}
                            >
                              {favorite.product.price} JD
                            </td>
                            <td
                              className="column-4"
                              style={{ textAlign: "center" }}
                            >
                              <button
                                className="flex-c-m stext-101 cl0 size-107 bg1 bor2 hov-btn1 
                                p-lr-15 trans-04 m-b-10" style={{marginLeft:"60px"}}
                                onClick={() =>
                                  handleAddToCart(favorite.product)
                                }
                              >
                                Add to Cart
                              </button>
                            </td>
                            <td
                              className="column-5"
                              style={{ textAlign: "center" }}
                            >
                              <button
                                className="btn-remove"
                                onClick={(event) =>
                                  handleRemoveFromWishlist(
                                    favorite.product.id,
                                    event
                                  )
                                }
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Wishlist;
