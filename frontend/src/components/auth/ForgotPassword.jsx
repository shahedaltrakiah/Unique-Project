import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/API";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Email is required",
        text: "Please provide your email address to reset your password.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.forgotPassword({ email });
      Swal.fire({
        icon: "success",
        title: "Password Reset Link Sent!",
        text: "Check your email for a link to reset your password.",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Send Reset Link",
        text: error.response?.data?.error || "An error occurred while sending the reset link.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg0 p-t-40 p-b-116 ">
      <div className="container">
        <div className="flex-w flex-tr">
          <div className="size-210 bor10 p-lr-70 p-t-150 p-b-70 p-lr-15-lg w-full-md"
          style={{marginLeft:'300px'}}>
            <form onSubmit={handleSubmit}>
              <h4 className="mtext-105 cl2 txt-center p-b-30">Forgot Password</h4>
              {/* Email */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <i className="fa fa-envelope how-pos4"></i>
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
