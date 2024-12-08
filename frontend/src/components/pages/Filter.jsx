import React, { useEffect, useState } from "react";
import apiService from "../../services/API"; 

function Filter({ setCategory, selectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories(); // Fetch categories from API
        setCategories(response); // Update categories state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

const handleFilterClick = (category) => {
    setCategory(category); // Notify parent about the selected category
  };


  return (
    <>
      <div className="p-b-10 p-t-40 p-l-75">
        <h3 className="ltext-103 cl5 ">
          {selectedCategory ? selectedCategory.name : "All Products"}
        </h3>
      </div>
      <div className="flex-w flex-sb-m p-l-75">
        <div className="flex-w flex-l-m filter-tope-group m-tb-10">
          {/* All Products Button */}
          <button
            onClick={() => handleFilterClick(null)} // Show all products
            className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
              !selectedCategory ? "how-active1" : ""
            }`}
          >
            All Products
          </button>

          {/* Render Dynamic Category Buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterClick(category)} // Filter by category
              className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                selectedCategory?.id === category.id ? "how-active1" : ""
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Filter;
