import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import CartSidebar from "./CartSidebar";
import Hero from "../pages/home/Hero";
import Model from "./Model";

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
    "/profile": "Profile",
    "/Profile": "Profile Info",
    "/profileOrder": "Order",
    "/MyProducts": "My Products",
    "/sell": "Sell Now",
    "/thankyou": "Thank You",
    "/ForgotPassword": "Forget Password",
  };

  // Check for dynamic product route
  const isProductDetails = /^\/product\/\d+$/.test(location.pathname);

  return (
    <>
      <NavBar />
      <CartSidebar />
      <Model />

      {/* Render Hero only on the Home Page */}
      {location.pathname === "/" && <Hero />}

      {/* Breadcrumb for all other pages */}
      {location.pathname !== "/" && (
        <div className="breadcrumb-container">
          <Breadcrumb
            text={
              isProductDetails
                ? "Product Details"
                : breadcrumbs[location.pathname] || "Page"
            }
          />
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
