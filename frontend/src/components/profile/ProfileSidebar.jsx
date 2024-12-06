import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function ProfileSidebar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebarr">
      <ul>
        <li>
          <button
            className="view-details-btn"
            onClick={() => handleNavigation("/Profile")}
          >
            Personal Info
          </button>
        </li>
        <li>
          <button
            className="view-details-btn"
            onClick={() => handleNavigation("/profileOrder")}
          >
            Order History
          </button>
        </li>
        <li>
          <button
            className="view-details-btn"
            onClick={() => handleNavigation("/MyProducts")}
          >
            My Products
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileSidebar;
