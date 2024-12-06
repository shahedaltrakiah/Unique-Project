import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";


function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <header>
      {/* Header desktop */}
      <div className="container-menu-desktop">
        <div className="wrap-menu-desktop">
          <nav className="limiter-menu-desktop container">
            {/* Logo desktop */}
            <a href="/" className="logo">
              <img
                src="../public/assets/images/logo.png"
                alt="IMG-LOGO"
                style={{ maxWidth: "180px" }}
              />
            </a>
            {/* Menu desktop */}
            <div className="menu-desktop">
              <ul className="main-menu">
                <li className={location.pathname === "/" ? "active-menu" : ""}>
                  <Link to="/">Home</Link>
                </li>
                <li
                  className={location.pathname === "/shop" ? "active-menu" : ""}
                >
                  <Link to="/shop">Shop</Link>
                </li>
                <li
                  className={location.pathname === "/sell" ? "active-menu" : ""}
                >
                  <Link to="/sell">Sell</Link>
                </li>
                <li
                  className={
                    location.pathname === "/about" ? "active-menu" : ""
                  }
                >
                  <Link to="/about">About</Link>
                </li>
                <li
                  className={
                    location.pathname === "/contact" ? "active-menu" : ""
                  }
                >
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            {/* Icon header */}
            <div
              className="wrap-icon-header flex-w flex-r-m"
              style={{ gap: "15px" }}
            >
              <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                <i className="zmdi zmdi-search" />
              </div>
              <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                data-notify={2}
              >
                <i className="zmdi zmdi-shopping-cart" />
              </div>
              <a
                href="/wishlist"
                className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 icon-header-noti icon-header-noti"
                data-notify={0}
              >
                <i className="zmdi zmdi-favorite-outline" />
              </a>
              {/* Login/Profile Icon */}
              {isLoggedIn ? (
                <div className="dropdown">
                  <a
                    href="#"
                    className="icon-header-item cl2 hov-cl1 trans-04"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src="../public/assets/images/icons/profile.png"
                      alt="PROFILE"
                      style={{ maxWidth: "20px", marginRight: "8px" }}
                    />
                  </a>
                  <div className="dropdown-content">
                    <a href="/profile">My Profile</a>
                    <a href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </div>
                </div>
              ) : (
                <a
                  href="/login"
                  className="icon-header-item cl2 hov-cl1 trans-04"
                >
                  <img
                    src="../public/assets/images/icons/login.png"
                    alt="LOGIN"
                    style={{ maxWidth: "25px" }}
                  />
                </a>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Header Mobile */}
      <div className="wrap-header-mobile">
        {/* Logo mobile */}
        <div className="logo-mobile">
          <a href="/">
            <img src="../public/assets/images/logo.png" alt="IMG-LOGO" />
          </a>
        </div>
        {/* Icon header */}
        <div className="wrap-icon-header flex-w flex-r-m m-r-15">
          <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
            <i className="zmdi zmdi-search" />
          </div>
          <div
            className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
            data-notify={2}
          >
            <i className="zmdi zmdi-shopping-cart" />
          </div>
          <a
            href="/wishlist"
            className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
            data-notify={0}
          >
            <i className="zmdi zmdi-favorite-outline" />
          </a>

          {/* Login/Profile Icon */}
          {isLoggedIn ? (
            <div className="dropdown">
              <a
                href="#"
                className="icon-header-item cl2 hov-cl1 trans-04"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src="../public/assets/images/icons/profile.png"
                  alt="PROFILE"
                  style={{ maxWidth: "20px", marginRight: "8px" }}
                />
              </a>
              <div className="dropdown-content">
                <a href="/profile">My Profile</a>
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <a
              href="/login"
              className="icon-header-item cl2 hov-cl1 trans-04"
              data-notify={0}
            >
              <img src="../public/assets/images/icons/login.png" />
            </a>
          )}
        </div>
        {/* Button show menu */}
        <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
