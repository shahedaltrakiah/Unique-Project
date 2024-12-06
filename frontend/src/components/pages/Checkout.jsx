import React, { useState } from "react";

function Checkout() {
    const [showAddress, setShowAddress] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    return (
        <div>
            {/* Breadcrumb */}
            <div className="container">
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                    <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
                        Home
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </a>
                    <span className="stext-109 cl4">Checkout</span>
                </div>
            </div>

            {/* Checkout Form */}
            <form className="bg0 p-t-75 p-b-85">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                            <div className="m-l-25 m-r--38 m-lr-0-xl">
                                <h4 className="mtext-109 cl2 p-b-30">Checkout</h4>

                                {/* Name */}
                                <div className="bor8 bg0 m-b-20">
                                    
                                    <input
                                        className="stext-111 cl8 plh3 size-111 p-lr-15"
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                    />
                                </div>

                                {/* Email */}
                                <div className="bor8 bg0 m-b-20">
                                    <input
                                        className="stext-111 cl8 plh3 size-111 p-lr-15"
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="bor8 bg0 m-b-20">
                                    <input
                                        className="stext-111 cl8 plh3 size-111 p-lr-15"
                                        type="text"
                                        name="phone"
                                        placeholder="Phone Number"
                                    />
                                </div>

                                {/* Toggle for Adding a Different Phone Number */}
                                <div className="flex-w p-t-15 p-b-15">
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={showPhoneNumber}
                                            onChange={() => setShowPhoneNumber(!showPhoneNumber)}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                    <span className="stext-111 cl8 m-l-15">
                                        Add a different phone number
                                    </span>
                                </div>

                                {/* Conditional Additional Phone Number Field */}
                                {showPhoneNumber && (
                                    <div className="bor8 bg0 m-b-20">
                                        <input
                                            className="stext-111 cl8 plh3 size-111 p-lr-15"
                                            type="text"
                                            name="altPhone"
                                            placeholder=""
                                        />
                                    </div>
                                )}

                                {/* Address */}
                                <div className="bor8 bg0 m-b-12">
                                    <label htmlFor="address" className="stext-111 cl8 p-b-5">
                                        Address
                                    </label>
                                    <input
                                        className="stext-111 cl8 plh3 size-115 p-lr-15 h-36"
                                        type="text"
                                        name="address"
                                        placeholder=""
                                    />
                                </div>

                                {/* Toggle for Adding a Different Address */}
                                <div className="flex-w p-t-15 p-b-15">
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={showAddress}
                                            onChange={() => setShowAddress(!showAddress)}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                    <span className="stext-111 cl8 m-l-15">
                                        Add a different address
                                    </span>
                                </div>

                                {/* Conditional Additional Address Field */}
                                {showAddress && (
                                    <div className="bor8 bg0 m-b-12">
                                        <textarea
                                            className="stext-111 cl8 plh3 size-115 p-lr-15 h-100"
                                            name="altAddress"
                                            placeholder=""
                                        ></textarea>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
                            <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                                <h4 className="mtext-109 cl2 p-b-30">Your Order</h4>

                                <div className="flex-w flex-t bor12 p-b-13">
                                    <div className="size-208">
                                        <span className="stext-110 cl2">PRODUCT</span>
                                    </div>
                                    <div className="size-209">
                                        <span className="mtext-110 cl2" style={{ marginLeft: "90px" }}>
                                            SUBTOTAL
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-w flex-t bor12 p-b-13">
                                    <div className="size-208">
                                        <span className="stext-110 cl2">Ronstring</span>
                                    </div>
                                    <div className="size-209">
                                        <span className="mtext-110 cl2" style={{ marginLeft: "90px" }}>
                                            $ 134.08
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-w flex-t bor12 p-b-13">
                                    <div className="size-208">
                                        <span className="stext-110 cl2">Solarbreeze</span>
                                    </div>
                                    <div className="size-209">
                                        <span className="mtext-110 cl2" style={{ marginLeft: "90px" }}>
                                            $ 124.16
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-w flex-t bor12 p-b-13">
                                    <div className="size-208">
                                        <span className="stext-110 cl2">Subtotal:</span>
                                    </div>
                                    <div className="size-209">
                                        <span className="mtext-110 cl2" style={{ marginLeft: "90px" }}>
                                            $ 258.24
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-w flex-t p-t-27 p-b-33">
                                    <div className="size-208">
                                        <span className="mtext-101 cl2">Total:</span>
                                    </div>
                                    <div className="size-209 p-t-1">
                                        <span className="mtext-110 cl2" style={{ marginLeft: "90px" }}>
                                            $ 258.24
                                        </span>
                                    </div>
                                </div>

                                <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Checkout;
