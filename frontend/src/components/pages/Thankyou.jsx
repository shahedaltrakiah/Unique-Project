import React from "react";
import { useNavigate } from "react-router-dom"; 

function ThankYou() {
  const navigate = useNavigate(); // Ensure it's inside the component

  return (
    <div className="thank-you-container mb-5">
      <div className="icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <circle cx={9} cy={21} r={1} />
          <circle cx={20} cy={21} r={1} />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          <path d="M9 11l3 3L22 4" />
        </svg>
      </div>
      <h1>Thank you!</h1>
      <p>Your order was successfully completed.</p>
      <button
        className="stext-101 cl0 size-101 bg1 bor1 hov-btn1 trans-04"
        onClick={() => {
          console.log("Navigating to home page...");
          navigate("/"); // Ensure this path is correct
        }}
      >
        Back to shop
      </button>
    </div>
  );
}

export default ThankYou;
