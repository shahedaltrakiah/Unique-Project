import React, { useState } from 'react';
import axios from '../../axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', formData);
            console.log(response.data.message);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <section className="bg0 p-t-104 p-b-116">
          <div className="container">
            <div className="flex-w flex-tr">
              <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                <form>
                  <h4 className="mtext-105 cl2 txt-center p-b-30">
                    Register
                  </h4>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="text" name="name" placeholder="Your Name " />
                    <img className="how-pos4 pointer-none" src="public/assets/images/icons/icon-email.png" alt="ICON" />
                  </div>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="text" name="email" placeholder="Your Email Address" />
                    <img className="how-pos4 pointer-none" src="images/icons/icon-email.png" alt="ICON" />
                  </div>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="password" name="password" placeholder="Password" />
                    <img className="how-pos4 pointer-none" src="images/icons/icon-email.png" alt="ICON" />
                  </div>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="password" name="password" placeholder="Confirm Password" />
                    <img className="how-pos4 pointer-none" src="images/icons/icon-email.png" alt="ICON" />
                  </div>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="text" name="address" placeholder="Address" />
                    <img className="how-pos4 pointer-none" src="images/icons/icon-email.png" alt="ICON" />
                  </div>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="tel" name="phone" placeholder="Phone Number" />
                    <img className="how-pos4 pointer-none" src="images/icons/icon-email.png" alt="ICON" />
                  </div>
                  <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                    Submit
                  </button>
                </form>
              </div>
              <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">
                <img src="login-img" />
              </div>
            </div>
          </div>
        </section>
      );
};

export default Register;
