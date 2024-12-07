import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // To get query parameters
import apiService from "../../../services/API"; // Adjust path as needed
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Products() {
  const [products, setProducts] = useState([]); // List of products
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // If more products are available
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [cartItems, setCartItems] = useState([]); // Cart items state

  const location = useLocation(); // To extract the current URL
  const params = new URLSearchParams(location.search); // Parse query params
  const categoryId = params.get("category"); // Get category ID from query params

  // Fetch products by page
  const fetchProducts = async (page) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (categoryId) {
        console.log("Fetching products for category:", categoryId); // Debugging log
        response = await apiService.getProductsByCategory(categoryId, page); // Fetch by category
      } else {
        console.log("Fetching all products for page:", page); // Debugging log
        response = await apiService.getProducts(page); // General fetch
      }

      if (response.data) {
        setProducts((prevProducts) => [...prevProducts, ...response.data]); // Append new products
        setHasMore(response.current_page < response.last_page); // Check if there are more pages
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Get cart items from cookies
  const getCartItems = () => {
    return JSON.parse(Cookies.get("cart") || "[]"); // Retrieve cart data or return an empty array
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    try {
      let cart = JSON.parse(Cookies.get("cart") || "[]");
      const existingProduct = cart.find((item) => item.id === product.id); // Check if the product already exists using its ID

      if (!existingProduct) {
        cart.push(product); // Add the full product to the cart
        Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
        setCartItems(cart); // Update cart items state
        alert("تم إضافة المنتج إلى السلة!");
      } else {
        alert("المنتج موجود بالفعل في السلة!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("حدث خطأ أثناء الإضافة إلى السلة.");
    }
  };

  // Initialize products and cart data on mount
  useEffect(() => {
    setProducts([]); // Reset products when the category changes
    setCurrentPage(1); // Reset to the first page
    fetchProducts(1); // Fetch first page of products
    const cartData = getCartItems(); // Fetch cart data
    setCartItems(cartData); // Set cart items state
  }, [categoryId]);

  // Handle Load More
  const handleLoadMore = () => {
    if (hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage); // Increment page number
      fetchProducts(nextPage);
    }
  };


  const handleAddToFavorite = (productId) => {
    apiService
      .addToFavorite({ productId }) // Replace `productId` dynamically
      .then((response) => {
        console.log("Added to favorites successfully:", response);
        // Optionally update the UI to reflect the addition
      })
      .catch((error) => {
        console.error("Error adding to favorites:", error);
        alert("Failed to add to favorites. Please try again.");
      });
  };

  return (
    <section className="bg0 p-t-23 p-b-140">
      <div className="container">
        <div className="p-b-10">
          <h3 className="ltext-103 cl5">Product Overview</h3>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="row isotope-grid">
          {products.map((product) => (
            <div
              className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
              key={product.id}
            >
              {/* Block2 */}
              <div className="block2">
                <div className="block2-pic hov-img0">
                  <img
                    src={`/assets/images/${product.image}`}
                    alt={product.name}
                  />
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="block2-txt flex-w flex-t p-t-14">
                  <div className="block2-txt-child1 flex-col-l">
                    <Link
                      to={`/product/${product.id}`}
                      className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    >
                      {product.name}
                    </Link>
                    <span className="stext-105 cl3">{product.price}</span>
                  </div>
                  <div className="block2-txt-child2 flex-r p-t-3">
                    <button
                      className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                      onClick={() => handleAddToFavorite(product.id)} // Replace `productId` with actual product ID
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

        {/* Load More Button */}
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
