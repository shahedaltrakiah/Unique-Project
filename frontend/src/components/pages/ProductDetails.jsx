import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../services/API";

function ProductDetails() {
  const { id } = useParams(); // Extract product ID from the URL
  const [product, setProduct] = useState(null); // State to hold product details
  const [loading, setLoading] = useState(true);
  console.log("Product ID from URL:", id);

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
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (!product) {
    return <div>Product not found.</div>; // Display if product is not found
  }

  return (
    <div className="product-details-container">
      <div className="product-details-row">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={`/assets/images/${product.image}`}
              alt={product.name}
              className="product-main-image"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <span className="product-price">{product.price}</span>
          <span className="product-price">{product.number_size}</span>
          <span className="product-price">{product.string_size}</span>

          {/* Add to Cart and Wishlist */}
          <div className="product-actions">
            <button className="btn-add-to-cart">Add to Cart</button>
            <button className="btn-add-to-wishlist">
              <i className="fa fa-heart"></i> Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
