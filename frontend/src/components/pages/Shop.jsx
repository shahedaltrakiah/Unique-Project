import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiService from "../../services/API";
import Products from "../pages/home/Products"; 

function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (categoryId) {
          // Fetch products by category
          response = await apiService.getProductsByCategory(categoryId);
        } else {
          // Fetch all products
          response = await apiService.getProducts();
        }
        setProducts(response);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <h1>Shop</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Products/>
    </div>
  );
}

export default Shop;
