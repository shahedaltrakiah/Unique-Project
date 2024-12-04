import React, { useState } from 'react';
import axios from '../../axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('/register', formData);
            console.log(response.data.message);
            alert("Registration successful!");
        } catch (error) {
            console.error(error.response?.data || "Error during registration");
            alert("Registration failed.");
        }
    };

    return (
        <section className="bg0 p-t-104 p-b-116">
            <div className="container">
                <div className="flex-w flex-tr">
                    <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                        <form onSubmit={handleSubmit}>
                            <h4 className="mtext-105 cl2 txt-center p-b-30">
                                Register
                            </h4>
                            <div className="bor8 m-b-20 how-pos4-parent">
                                <input
                                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <img className="how-pos4 pointer-none" src="/assets/icons/user-icon.png" alt="User Icon" />
                            </div>
                            <div className="bor8 m-b-20 how-pos4-parent">
                                <input
                                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                    type="email"
                                    name="email"
                                    placeholder="Your Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <img className="how-pos4 pointer-none" src="/assets/icons/email-icon.png" alt="Email Icon" />
                            </div>
                            <div className="bor8 m-b-20 how-pos4-parent">
                                <input
                                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <img className="how-pos4 pointer-none" src="/assets/icons/password-icon.png" alt="Password Icon" />
                            </div>
                            <div className="bor8 m-b-20 how-pos4-parent">
                                <input
                                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <img className="how-pos4 pointer-none" src="/assets/icons/confirm-password-icon.png" alt="Confirm Password Icon" />
                            </div>
                            <div className="bor8 m-b-20 how-pos4-parent">
                                <input
                                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                                <img className="how-pos4 pointer-none" src="/assets/icons/address-icon.png" alt="Address Icon" />
                            </div>
                            <div className="bor8 m-b-20 how-pos4-parent">
                                <input
                                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                <img className="how-pos4 pointer-none" src="/assets/icons/phone-icon.png" alt="Phone Icon" />
                            </div>
                            <button
                                type="submit"
                                className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">
                        <img src="/assets/images/register-img.png" alt="Register Illustration" />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Register;
