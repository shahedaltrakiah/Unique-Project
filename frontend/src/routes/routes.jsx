import About from "../components/pages/About";
// import Breadcrumb from "../components/Breadcrumb";
import Cart from "../components/pages/Cart";
import Checkout from "../components/pages/Checkout";
import Contact from "../components/pages/Contact";
// import Footer from "../components/Footer";
import Head from "../components/utils/Head";
// import Hero from "../components/Hero";
import Home from "../components/pages/Home";
import Login from "../components/auth/Login";
// import NavBar from "../components/NavBar";
import ProductDetails from "../components/pages/ProductDetails";
import Profile from "../components/profile/Profile";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileManage from "../components/profile/ProfileManage";
import ProfileOrder from "../components/profile/ProfileOrder";
import ProfileUpdate from "../components/profile/ProfileUpdate";
import Register from "../components/auth/Register";
import Sell from "../components/pages/Sell";
import Shop from "../components/pages/Shop";
import Wishlist from "../components/pages/Wishlist";
import Layout from "../components/common/Layout";

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
