import React, { useState, useEffect } from "react";
import "./Profile.css";
import ProfileSidebar from "./ProfileSidebar";
import apiService from "../../services/API"; // Assuming you have an apiService for API calls
import Swal from "sweetalert2"; // Import SweetAlert2

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    console.log("auth_token:", token);

    if (token) {
      apiService
        .getUserData(token) // Pass the token to get user data
        .then((data) => {
          console.log("User Data:", data); // Log the fetched data to confirm it's being received
          // Ensure we are setting the user data correctly here
          setUserData({
            name: data.data.name,
            email: data.data.email,
            phone: data.data.phone,
            address: data.data.address,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data.");
          setLoading(false);
        });
    } else {
      setError("Missing auth_token.");
      setLoading(false);
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    apiService
      .updateUserProfile(userData, token)
      .then((response) => {
        console.log("Profile updated successfully:", response);
        // Update the state with the new user data
        setUserData((prevData) => ({
          ...prevData,
          name: data.data.name,
          email: data.data.email,
          phone: data.data.phone,
          address: data.data.address,
        }));
        // Show success message with SweetAlert2
        Swal.fire({
          title: "Success!",
          text: "Your profile has been updated.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        // Show error message with SweetAlert2
        Swal.fire({
          title: "Error!",
          text: "Failed to update your profile. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        setError("Failed to update profile.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container mt-5">
      <ProfileSidebar />
      <div className="content" id="content">
        {/* Profile Section */}
        <div className="profile-card card active" id="personalInfo">
          <button
            className="profile-edit-btn"
            onClick={handleSaveChanges} // Trigger save changes
          >
            Save Changes
          </button>
          <div className="profile-info">
            <div>
              <h3 className="title mt-4">Personal Info</h3>
            </div>
          </div>
          <div className="profile-details">
            <div className="row">
              <div className="col-md-6 mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
