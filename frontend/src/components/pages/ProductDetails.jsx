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
    } catch (err) {
      console.error("Error adding to favorites:", err);
      Swal.fire({
        title: "Failed to add product to favorites.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-details-row">
        <div className="wrap-slick3 flex-sb flex-w">
          <div className="wrap-slick3-dots" />
          <div className="wrap-slick3-arrows flex-sb-m flex-w" />
          <div className="slick3 gallery-lb">
            {product.product_images && product.product_images.length > 0 ? (
              product.product_images.map((image) => (
                <div key={image.id} className="item-slick3">
                  <div className="wrap-pic-w pos-relative">
                    <img
                      src={`${image.image}`}
                      alt={product.name}
                    />
                    <a
                      className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                      href={`${image.image}`}
                    >
                      <i className="fa fa-expand" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>No additional images available.</p>
            )}
          </div>
        </div>

        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={`${product.image}`}
              alt={product.name}
              className="product-main-image"
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <span className="product-price">Price: {product.price}</span>
          <span className="product-size">Size: {product.size}</span>

          {/* Add to Cart and Wishlist */}
          <div className="product-actions">
            <button
              className="btn-add-to-cart"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className="btn-add-to-wishlist"
              onClick={() => handleAddToFavorite(product.id)}
            >
              <i className="fa fa-heart"></i> Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
