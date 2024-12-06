import React from "react";
import "./Profile.css";
import ProfileSidebar from "./ProfileSidebar";

function Profile() {
  return (
    <div class="main-container mt-5">
      <ProfileSidebar />

      <div className="content" id="content">
        {/* Profile Section */}
        <div className="profile-card card active" id="personalInfo">
          <button
            className="profile-edit-btn"
            data-bs-toggle="modal"
            data-bs-target="#editProfileModal"
          >
            Edit Profile
          </button>
          <div className="profile-info">
            <div>
              <h3 className="mt-4">Name</h3>
            </div>
          </div>
          <div className="profile-details ">
            <div className="row">
              <div className="col-md-6 mt-3">
                <label>First Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6 mt-3">
                <label>Last Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6 mt-3">
                <label>Email</label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-md-6 mt-3">
                <label>Phone Number</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12 mt-3">
                <label>Address</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Profile;
