import React, { useEffect, useState } from "react";
import apiService from "./apiService";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiService.getProductById(productId);
        setProduct(data.data); // Assuming `data` contains the product details
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Status: {product.status}</p>
    </div>
  );
};

export default ProductDetails;
