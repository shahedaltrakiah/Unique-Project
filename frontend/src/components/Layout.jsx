import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Hero from "./Hero";
import Breadcrumb from "./Breadcrumb";

const Layout = () => {
  const location = useLocation();

  // Define breadcrumb text based on the current route
  const breadcrumbs = {
    "/about": "About Us",
    "/shop": "Shop",
    "/cart": "Your Cart",
    "/checkout": "Checkout",
    "/contact": "Contact Us",
    "/login": "Login",
    "/register": "Register",
    "/wishlist": "Wishlist",
    "/profile": "profile",
    "/productdetails": "product details",
    "/profileinfo": "Profile Info",
    "/profilemanage": "Profile Manage",
    "/profileorder": "Profile Order",
    "/profileupdate": "Profile Update",
    "/sell": "sell",
  };

  return (
    <>
      <NavBar />
      {/* Show Hero only on the Home page */}
      {location.pathname === "/" && <Hero />}

      {/* Breadcrumb for all other pages */}
      {location.pathname !== "/" && (
        <div className="breadcrumb-container">
          <Breadcrumb text={breadcrumbs[location.pathname] || "Page"} />
        </div>
      )}

      <main>
        {/* Render the content for the current route */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

