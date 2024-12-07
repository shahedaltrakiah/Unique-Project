import React, { useEffect, useState } from "react";
import apiService from "../../../services/API";
import { Link } from "react-router-dom";

function Banner() {
  const [categories, setCategories] = useState([]); // Categories state
  const [error, setError] = useState(null); // Error state

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories();
        setCategories(response); // Set categories data
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="sec-banner bg0 p-t-80 p-b-50">
      <div className="container">
        <div className="row">
          {error && <p style={{ color: "red" }}>{error}</p>}

          {categories.map((category) => (
            <div
              className="col-md-3 col-xl-3 p-b-30 m-lr-auto"
              key={category.id}
            >
              {/* Block for each category */}
              <div className="block1 wrap-pic-w">
                <img
                  src={`/assets/images/${category.image}`} // Replace with category image path
                  alt={category.name}
                />
                <Link
                  to={`/shop?category=${category.id}`} // Link to shop filtered by category
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      {category.name}
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
