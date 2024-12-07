import React, { useEffect, useState } from "react";
import apiService from "../../../services/API";

function Banner() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories();
        setCategories(response); // Set the fetched categories
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="sec-banner bg0 p-t-80 p-b-50">
      <div className="container">
        <div className="row">
          {categories.map((category) => (
            <div
              className="col-md-3 col-xl-3 p-b-30 m-lr-auto"
              key={category.id}
            >
              {/* Block1 */}
              <div className="block1 wrap-pic-w">
                <img
                  src={`/assets/images/${category.image}`} // Use category image
                  alt={category.name}
                />
                <a
                  href={`/shop?category=${category.id}`} // Dynamic link based on category ID
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      {category.name} {/* Use category name */}
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
