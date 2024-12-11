import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // Import Link
import Filter from "./Filter";
import apiService from "../../services/API";
import Cookies from "js-cookie";

function Shop() {
  const [products, setProducts] = useState([]); // Products state
  const [category, setCategory] = useState(null); // Selected category state
  const [error, setError] = useState(null); // Error state
  const [cartItems, setCartItems] = useState([]); // Cart items state
  const [categories, setCategories] = useState([]); // Categories state

  const location = useLocation(); // To access query parameters
  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  const categoryIdFromUrl = queryParams.get("category"); // Extract category ID from URL

  const navigate = useNavigate();

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

  // Fetch categories for mapping category IDs to names
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories(); // Fetch categories from API
        setCategories(response); // Save categories
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Update the category state when navigating from the banner
  useEffect(() => {
    if (categoryIdFromUrl) {
      // Find the category name based on categoryIdFromUrl
      const matchedCategory = categories.find(
        (cat) => cat.id === parseInt(categoryIdFromUrl)
      );
      if (matchedCategory) {
        setCategory(matchedCategory); // Update the category state
      }
    } else {
      setCategory(null); // Clear the category if no categoryIdFromUrl
    }
  }, [categoryIdFromUrl, categories]);

  // Fetch products whenever the category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = category?.id ? { category_id: category.id } : {}; // Add category_id if category exists
        const response = await apiService.getShopProducts(params); // Fetch products
        setProducts(response); // Update products state
      } catch (err) {
        console.error("Error fetching shop products:", err);
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, [category]);

  const handleFilterChange = (selectedCategory) => {
    if (selectedCategory?.id) {
      navigate(`/shop?category=${selectedCategory.id}`); // Update the URL
    } else {
      navigate("/shop"); // Clear the filter
    }
    setCategory(selectedCategory); // Update the category state
  };

  return (
    <div>
      {/* Pass setCategory to Filter to handle filter interactions */}
      <Filter setCategory={handleFilterChange} selectedCategory={category} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <div className="row isotope-grid">
            {products.map((product) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item"
                key={product.id}
              >
                <div className="block2">
                  <div className="block2-pic hov-img0">
                    <img src={`${product.image}`} alt={product.name}
                    style={{Width:'310px' , height:"300px"}} />
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                    >
                      Add To Cart
                    </button>
                  </div>
                  <div
                    className="block2-txt flex-w flex-t p-t-14"
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
        </div>
      </section>
    </div>
  );
}

export default Shop;
