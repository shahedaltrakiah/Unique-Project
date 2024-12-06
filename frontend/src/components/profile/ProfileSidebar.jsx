
import React from "react";
import "./Profile.css";


function ProfileSidebar(){
    return(

   
<>
  <link href="/public/css/user_profile_style.css" rel="stylesheet" />
  <div className="main-container mt-5">
    <div className="sidebar">
      <div className="profile-infoo">
        <img
          src="#"
          alt="Profile Image"
        />
      </div>
      <ul>
        <li>
          <button className="view-details-btn" id="personalInfoBtn">
            Personal Info
          </button>
        </li>
        <li>
          
          <button className="view-details-btn" id="orderHistoryBtn">
            Order History
          </button>
        </li>
        <li>
          
          <button className="view-details-btn" id="wishlistBtn">
            Wishlist
          </button>
        </li>
      </ul>
    </div>
  </div>
</>


);
}

export default ProfileSidebar;