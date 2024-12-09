import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../services/API";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function ProductDetails() {
  const { id } = useParams(); // Extract product ID from the URL
  const [product, setProduct] = useState(null); // State to hold product details
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]); // Cart items state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiService.getProductById(id); // Fetch product by ID
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
      setCartItems(getCartItems());
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (!product) {
    return <div>Product not found.</div>; // Display if product is not found
  }

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
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = `/product/${productId}`;
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

  const handleAddToFavorite = async (productId) => {
    const token = localStorage.getItem("auth_token");

    // Check if user is logged in
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

      // Success: Product added to favorites
      if (response.status === 201) {
        Swal.fire({
          title: "Product added to favorites!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      // Conflict: Product already in favorites
      else if (response.status === 409) {
        Swal.fire({
          title: "Product already in favorites!",
          icon: "info",
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

  return (
    <div className="product-details-container">
      {/* Sub Images Column */}
      <div className="product-sub-images">
        {product.product_images && product.product_images.length > 0 ? (
          product.product_images.map((image) => (
            <div key={image.id} className="sub-image-item">
              <div className="wrap-pic-w pos-relative">
                <img src={`${image.image}`} alt={product.name} />
                <a className="image-expand-link" href={`${image.image}`}>
                  <i className="fa fa-expand" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No additional images available.</p>
        )}
      </div>

      {/* Main Image */}
      <div className="product-main-image-container">
        <div className="wrap-pic-w pos-relative">
          <img
            src={`${product.image}`}
            alt={product.name}
            className="product-main-image"
          />
          <a className="image-expand-link" href={`${product.image}`}>
            <i className="fa fa-expand" />
          </a>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <span className="product-price">Price: {product.price}JD</span>
          {product.category && product.category.toLowerCase() !== "bag" ? (
            <span className="product-size">Size: {product.size}</span>
          ) : (
            <span className="product-category">
              This is a bag, no size available.
            </span>
          )}
        </div>

        {/* Add to Cart and Wishlist */}
        <div className="product-actions">
          <button
            className="flex-c-m stext-101 cl0 size-107 bg1 bor2 hov-btn1 p-lr-15 trans-04 m-b-10"
            onClick={() => handleAddToCart(product)}
          >
            Add to &nbsp; <i className="zmdi zmdi-shopping-cart" />
          </button>
          <button
            className="flex-c-m stext-101 cl0 size-107 bg10 bor2 hov-btn1 p-lr-15 trans-04 m-b-10"
            onClick={() => handleAddToFavorite(product.id)}
          >
            Add to &nbsp; <i className="fa fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
