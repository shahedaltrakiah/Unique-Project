import React, { useState } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', formData);
            console.log(response.data.message);
            alert("Login successful!");
        } catch (error) {
            console.error(error.response?.data || "Error during login");
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <section className="bg0 p-t-104 p-b-116">
            <div className="container">
                <div className="flex-w flex-tr">
                    {/* Login Form */}
                    <div className="size-210 bor10 p-lr-70 p-t-150 p-b-70 p-lr-15-lg w-full-md ">
                    <form onSubmit={handleSubmit}>
                            <h4 className="mtext-105 cl2 txt-center p-b-30">
                                Login
                            </h4>
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
                            {/* Forgot Password Link */}
                            <div className="flex-sb-m p-t-15 p-b-15">
                                <Link
                                    to="/forgot-password"
                                    className="stext-111 cl2 hov-cl1 trans-04"
                                    style={{ fontSize: '14px' }}
                                >
                                    Forgot Password?
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
                    <div className="size-210 bor10 flex-w flex-col-m p-lr-1 w-full-md">
                        <img
                            src="../public/assets/images/login.jpg"
                            alt="Login Illustration"
                            style={{ width: '590px', height: '100%', objectFit: 'fill' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
