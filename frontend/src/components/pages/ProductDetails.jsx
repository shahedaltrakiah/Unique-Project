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
  const [expandedImage, setExpandedImage] = useState(null);

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
          // Reload the page after showing the success message
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
          // Reload the page after showing the success message
          window.location.href = "/";
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

  const handleImageExpand = (imageUrl) => {
    setExpandedImage(imageUrl);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <div className="product-details-container relative flex">
    {/* Image Expansion Overlay */}
    {expandedImage && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative flex max-w-[90%] max-h-[90%]">
          <button 
            onClick={handleCloseExpandedImage} 
            className="absolute -top-8 right-0 text-2xl z-60 text-gray-700 hover:text-black"
          >
            ×
          </button>
          <img 
            src={expandedImage} 
            alt="Expanded product" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    )}

    {/* Sub Images Column */}
    <div className="product-sub-images">
      {product.product_images && product.product_images.length > 0 ? (
        product.product_images.map((image) => (
          <div key={image.id} className="sub-image-item">
            <div className="wrap-pic-w pos-relative">
              <img 
                src={`${image.image}`} 
                alt={product.name} 
                className="cursor-pointer"
                onClick={() => handleImageExpand(image.image)}
              />
              <div 
                className="image-expand-link cursor-pointer"
                onClick={() => handleImageExpand(image.image)}
              >
                <i className="fa fa-expand" />
              </div>
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
          className="product-main-image cursor-pointer"
          onClick={() => handleImageExpand(product.image)}
        />
        <div 
          className="image-expand-link cursor-pointer"
          onClick={() => handleImageExpand(product.image)}
        >
          <i className="fa fa-expand" />
        </div>
      </div>
    </div>

    {/* Product Info */}
    <div className="product-info">
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <div className="product-details">
        <span className="product-price">Price: {product.price}JD</span>
        <span className="product-size">Size: {product.size}</span>
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
