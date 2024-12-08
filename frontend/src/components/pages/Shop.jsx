import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // Import Link
import Filter from "./Filter";
import apiService from "../../services/API";

function Shop() {
  const [products, setProducts] = useState([]); // Products state
  const [category, setCategory] = useState(null); // Selected category state
  const [error, setError] = useState(null); // Error state

  const location = useLocation(); // To access query parameters
  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  const categoryIdFromUrl = queryParams.get("category"); // Extract category ID from URL

  const navigate = useNavigate();

  // Fetch products based on selected category
  const fetchProducts = async (selectedCategory) => {
    try {
      const params = selectedCategory?.id ? { category_id: selectedCategory.id } : {}; // Only add category_id if it exists
      const response = await apiService.getShopProducts(params); // Fetch products
      setProducts(response);
    } catch (err) {
      console.error("Error fetching shop products:", err);
      setError("Failed to load products.");
    }
  };

  // Handle changes to the category (both URL changes and filter interaction)
  useEffect(() => {
    if (categoryIdFromUrl && (!category || category?.id !== categoryIdFromUrl)) {
      // If category ID is in the URL, set it as the selected category
      setCategory({ id: categoryIdFromUrl });
    } else if (!categoryIdFromUrl && category) {
      // If no category is in the URL, reset the category
      setCategory(null);
    }
  }, [categoryIdFromUrl]);

  // Fetch products whenever the category changes
  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  const handleFilterChange = (selectedCategory) => {
    if (selectedCategory?.id) {
      navigate(`/shop?category=${selectedCategory.id}`); // Update the URL with category_id
    } else {
      navigate("/shop"); // Clear the category filter in the URL
    }
    setCategory(selectedCategory); // Update the category state
  };

  return (
    <div>
      {/* Pass setCategory to Filter to handle filter interactions */}
      <Filter setCategory={handleFilterChange} />
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
                    <img
                      src={`/assets/images/${product.image}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="block2-txt flex-w flex-t p-t-14">
                    <div className="block2-txt-child1 flex-col-l">
                      {/* Make the product name clickable */}
                      <Link
                        to={`/product/${product.id}`} // Navigate to the product details page
                        className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                      >
                        {product.name}
                      </Link>
                      <span className="stext-105 cl3">{product.price}</span>
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
