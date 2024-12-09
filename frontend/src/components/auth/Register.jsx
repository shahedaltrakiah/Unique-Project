import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../../services/API";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address (e.g., user@example.com).",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
        text: "Please make sure both passwords are the same.",
      });
      return;
    }

    try {
      // Send registration data
      const response = await apiService.registerUser(formData);

      localStorage.setItem("auth_token", response.token);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You have been registered successfully.",
      }).then(() => {
        window.location.href = "/"; // Redirect to homepage or dashboard
      });

      // Clear form data
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
      });
    } catch (error) {
      // Handle validation errors here
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.error;

        if (errors.email) {
          Swal.fire({
            icon: "error",
            title: "Email Error",
            text: errors.email.join(", "),
          });
        } else if (errors.password) {
          Swal.fire({
            icon: "error",
            title: "Password Error",
            text: errors.password.join(", "),
          });
        } else if (errors.phone) {
          Swal.fire({
            icon: "error",
            title: "Phone Error",
            text: errors.phone.join(", "),
          });
        } else if (errors.name) {
          Swal.fire({
            icon: "error",
            title: "Name Error",
            text: errors.name.join(", "),
          });
        } else if (errors.address) {
          Swal.fire({
            icon: "error",
            title: "Address Error",
            text: errors.address.join(", "),
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <section className="bg0 p-t-104 p-b-116">
      <div className="container">
        <div className="flex-w flex-tr">
          {/* Registration Form */}
          <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
            <form onSubmit={handleSubmit}>
              <h4 className="mtext-105 cl2 txt-center p-b-30">Register</h4>
              {/* Name */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <i className="fa fa-user how-pos4"></i>
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Email */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <i className="fa fa-envelope how-pos4"></i>
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Password */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <i className="fa fa-lock how-pos4"></i>
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Confirm Password */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <i className="fa fa-lock how-pos4"></i>
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Address */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <i className="fa fa-map-marker how-pos4"></i>
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Phone */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <i className="fa fa-phone how-pos4"></i>
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex-sb-m p-t-10 p-b-25">
                <Link
                  to="/login"
                  className="stext-111 cl2 hov-cl1 trans-04"
                  style={{ fontSize: "14px" }}
                >
                  Already have an Account?
                </Link>
              </div>

              <button
                type="submit"
                className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="size-210 bor10 flex-w flex-col-m p-lr-1  w-full-md">
            <img
              src="../public/assets/images/login.jpg"
              alt="Login Illustration"
              style={{ width: "580px", height: "100%", objectFit: "fill" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
