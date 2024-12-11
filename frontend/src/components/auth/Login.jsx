import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/API";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await apiService.loginUser(formData);
      // Save the token in local storage
      localStorage.setItem("token", response.token);

      window.location.href = "/";
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg0 p-t-40 p-b-116">
      <div className="container">
        <div className="flex-w flex-tr">
          {/* Login Form */}
          <div className="size-210 bor10 p-lr-70 p-t-150 p-b-70 p-lr-15-lg w-full-md">
            <form onSubmit={handleSubmit}>
              <h4 className="mtext-105 cl2 txt-center p-b-30">Login</h4>
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

              {/* Links for Forgot Password and Register */}
              <div
                className="flex-sb-m p-t-15 p-b-25"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <Link
                  to="/ForgotPassword"
                  className="stext-111 cl2 hov-cl1 trans-04"
                  style={{ fontSize: "14px" }}
                >
                  Forgot Password?
                </Link>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#6c757d",
                  }}
                >
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="stext-111 cl2 hov-cl1 trans-04"
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Register
                  </Link>
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Submit"}
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="size-210 bor10 flex-w flex-col-m p-lr-1 w-full-md">
            <img
              src="public/assets/images/login.jpg"
              alt="Login Illustration"
              style={{ width: "580px", height: "100%", objectFit: "fill" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
