import About from "../components/About";
// import Breadcrumb from "../components/Breadcrumb";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Contact from "../components/Contact";
// import Footer from "../components/Footer";
import Head from "../components/Head";
// import Hero from "../components/Hero";
import Home from "../components/Home";
import Login from "../components/Login";
// import NavBar from "../components/NavBar";
import ProductDetails from "../components/ProductDetails";
import Profile from "../components/Profile";
import ProfileInfo from "../components/ProfileInfo";
import ProfileManage from "../components/ProfileManage";
import ProfileOrder from "../components/ProfileOrder";
import ProfileUpdate from "../components/ProfileUpdate";
import Register from "../components/Register";
import Sell from "../components/Sell";
import Shop from "../components/Shop";
import Wishlist from "../components/Wishlist";
import Layout from "../components/Layout";

const routes = [
    {
      path: "/",
      element: <Layout />, // Wrap all routes with the Layout
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/shop", element: <Shop /> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/contact", element: <Contact /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/profile", element: <Profile /> },
        { path: "/profileinfo", element: <ProfileInfo /> },
        { path: "/profilemanage", element: <ProfileManage /> },
        { path: "/profileorder", element: <ProfileOrder /> },
        { path: "/profileupdate", element: <ProfileUpdate /> },
        { path: "/productdetails", element: <ProductDetails /> },
        { path: "/sell", element: <Sell /> },
      ],
    },
  ];

export default routes;
