import React, { useEffect, useState } from "react";
import apiService from "../../../services/API";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
function Products() {
  const [products, setProducts] = useState([]); // Products state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [hasMore, setHasMore] = useState(true); // If there are more products to load
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Cart items state

  // Fetch products for the home page
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await apiService.getHomeProducts(page); // Fetch paginated products
      setProducts((prev) => [...prev, ...response.data]); // Append new products
      setHasMore(response.current_page < response.last_page); // Check if more pages exist
    } catch (error) {
      console.error("Error fetching home products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get cart items from cookies
  const getCartItems = () => JSON.parse(Cookies.get("cart") || "[]");

  // Add product to cart
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
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          title: "Product Already in Cart",
          text: "This product is already in your cart.",
          icon: "info",
          timer: 1500,
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

  // Add to favorites
  const handleAddToFavorite = async (productId) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      Swal.fire({
        title: "Please log in to add to favorites!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    try {
      const response = await apiService.addToFavorites(productId, token);
      if (response.data) {
        Swal.fire({
          title: "Product added to favorites!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/";
        });
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      Swal.fire({
        icon: "warning",
        title:
          error.response?.data?.error ||
          "Failed to add product to favorites. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  // Load more products
  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1); // Increment the current page
    }
  };

  useEffect(() => {
    fetchProducts(currentPage); // Fetch initial products
    setCartItems(getCartItems());
  }, [currentPage]);

  return (
    <section className="bg0 p-t-23 p-b-50">
      <div className="container">
        <div className="p-b-10">
          <h3 className="ltext-103 cl5">Product Overview</h3>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="row isotope-grid">
          {products.map((product) => (
            <div
              className="col-sm-6 col-md-4 col-lg-3 p-b-20 isotope-item women"
              key={product.id}
            >
              <div className="block2">
                <div className="block2-pic hov-img0">
                  <img
                    src={`${product.image}`}
                    alt={product.name}
                    style={{ Width: "310px", height: "300px" }}
                  />
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  >
                    Add To Cart
                  </button>
                </div>

                <div
                  className="block2-txt flex-w flex-t p-t-14 "
                  style={{ width: "230px", marginLeft: "10px" }}
                >
                  <div className="block2-txt-child1 flex-col-l">
                    <Link
                      to={`/product/${product.id}`}
                      className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    >
                      {product.name}
                    </Link>
                    <span className="stext-105 cl3 mytext">
                      {product.price}JD
                    </span>
                  </div>
                  <div className="block2-txt-child2 flex-r p-t-3">
                    <button
                      className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                      onClick={() => handleAddToFavorite(product.id)}
                    >
                      <img
                        className="icon-heart1 dis-block trans-04"
                        src="/assets/images/icons/icon-heart-01.png"
                        alt="ICON"
                      />
                      <img
                        className="icon-heart2 dis-block trans-04 ab-t-l"
                        src="/assets/images/icons/icon-heart-02.png"
                        alt="ICON"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex-c-m flex-w w-full p-t-45">
            <button
              onClick={handleLoadMore}
              className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
