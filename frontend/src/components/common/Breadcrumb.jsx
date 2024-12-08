import React from "react";

const Breadcrumb = ({ text }) => (
  <div>
    {/* Background Section */}
    <section 
      className="bg-img1 txt-center p-lr-15 p-tb-50" 
      style={{ backgroundImage: "url('public/assets/images/bg-01.jpg')" }}
    >
      <h2 className="ltext-105 cl0 txt-center breadcrumb-text">
      {text}
      </h2>
    </section>

    {/* Breadcrumb Section */}
    <div className="container">
      <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
        <a href="/" className="stext-109 cl8 hov-cl1 trans-04">
          Home
          <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
        </a>

        <span className="stext-109 cl4">
          {text}
        </span>
      </div>
    </div>
  </div>
);

export default Breadcrumb;
