import React, { useEffect } from "react";
import About from "./components/About";
import Breadcrumb from "./components/Breadcrumb";
import Cart from './components/Cart';

import Checkout from './components/Checkout';
import Contact from "./components/Contact";

import Footer from "./components/Footer";
import Head from './components/Head';

import Hero from "./components/Hero";
import Home from './components/Home';
import Login from './components/Login';

import NavBar from './components/NavBar';
import ProductDetails from './components/ProductDetails';
import Profile from "./components/Profile";
import ProfileInfo from './components/ProfileInfo';
import ProfileManage from "./components/ProfileManage";
import ProfileOrder from './components/ProfileOrder';
import ProfileUpdate from "./components/ProfileUpdate";
import Register from './components/Register';
import Sell from "./components/Sell";

import Shop from './components/Shop';
import Wishlist from "./components/Wishlist";

import ReactDOM from "react-dom/client";
import { BrowserRouter ,Routes,Route } from "react-router-dom"; 
import App from "./App"; // Import your App component

const Root = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/main.js"; 
    script.async = true; 
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={ <App />}></Route>
        <Route path="/about" element={ <About />}></Route>
        <Route path="/cart" element={ <Cart />}></Route>
        <Route path="/contact" element={ <Contact />}></Route>
        <Route path="/shop" element={ <Shop />}></Route>
       </Routes>

    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);