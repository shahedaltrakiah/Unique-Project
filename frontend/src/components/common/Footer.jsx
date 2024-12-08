import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/API";
function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories(); // Fetch categories from API
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <>
      {/* Footer */}
      <footer className="bg3 p-t-75 p-b-32 p-l-40">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center text-left">
            {/* Unique Store Section */}
            <div className="col-sm-6 col-lg-4 p-b-50">
              <h4 className="stext-301 cl0 p-b-10">Unique Store</h4>
              <ul className="list-unstyled">
                <li className="p-b-10">
                  <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                    Home
                  </a>
                </li>
                <li className="p-b-10">
                  <a href="/about" className="stext-107 cl7 hov-cl1 trans-04">
                    About Us
                  </a>
                </li>
                <li className="p-b-10">
                  <a href="/shop" className="stext-107 cl7 hov-cl1 trans-04">
                    Shop
                  </a>
                </li>
                <li className="p-b-10">
                  <a href="/sell" className="stext-107 cl7 hov-cl1 trans-04">
                    Sell
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories Section */}
            <div className="col-sm-6 col-lg-4 p-b-50">
              <h4 className="stext-301 cl0 p-b-10">Categories</h4>
              <ul className="list-unstyled">
                {categories.map((category) => (
                  <li key={category.id} className="p-b-10">
                    {/* Link to /shop with category query */}
                    <Link
                      to={`/shop?category=${category.id}`} // Pass category id as query param
                      className="stext-107 cl7 hov-cl1 trans-04"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logo Section */}
            <div className="col-sm-6 col-lg-4 p-b-50">
              <img
                src="public/assets/images/ourlogo.png"
                alt="Unique Store Logo"
                style={{ maxWidth: "250px", marginTop: "30px" }}
              />
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="p-t-40 d-flex justify-content-center align-items-center text-center">
            <p className="stext-107 cl6 txt-center">
              Copyright - 2024 © All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
