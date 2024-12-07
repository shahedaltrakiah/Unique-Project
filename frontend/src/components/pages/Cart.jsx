import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";  

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const getCartItems = () => {
        return JSON.parse(Cookies.get('cart') || '[]');
    };

    const handleRemoveItem = (productId) => {
        const updatedCart = getCartItems().filter(item => item.id !== productId);  
        Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 }); 
        setCartItems(updatedCart);  
    };

    useEffect(() => {
        const cartData = getCartItems(); 
        if (cartData && cartData.length > 0) {
            setCartItems(cartData);  
        } else {
            setCartItems([]);  
        }
    }, []);

    return (
        <div>
            <div className="wrap-header-cart js-panel-cart">
                <div className="s-full js-hide-cart"></div>

                <div className="header-cart flex-col-l p-l-65 p-r-25">
                    <div className="header-cart-title flex-w flex-sb-m p-b-8">
                        <span className="mtext-103 cl2">Your Cart</span>
                        <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
                            <i className="zmdi zmdi-close"></i>
                        </div>
                    </div>

                    <div className="header-cart-content flex-w js-pscroll">
                        <ul className="header-cart-wrapitem w-full">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <li className="header-cart-item flex-w flex-t m-b-12" key={item.id}>
                                        <div className="header-cart-item-img">
                                            <img src={item.image} alt={item.name} />
                                        </div>

                                        <div className="header-cart-item-txt p-t-8">
                                            <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                                {item.name}
                                            </a>

                                            <span className="header-cart-item-info">
                                                1 x {item.price}
                                            </span>
                                        </div>

                                        <div className="header-cart-item-remove">
                                            <button onClick={() => handleRemoveItem(item.id)} className="btn-remove">
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>سلة التسوق فارغة!</p>
                            )}
                        </ul>

                        <div className="w-full">
                            <div className="header-cart-total w-full p-tb-40">
                                Total:
                                {cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}
                            </div>

                            <div className="header-cart-buttons flex-w w-full">
                                <a href="shoping-cart.html" className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
                                    View Cart
                                </a>

                                <a href="shoping-cart.html" className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
                                    Check Out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                    <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
                        Home
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </a>

                    <span className="stext-109 cl4">Shopping Cart</span>
                </div>
            </div>

            <form className="bg0 p-t-75 p-b-85">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                            <div className="m-l-25 m-r--38 m-lr-0-xl">
                                <div className="wrap-table-shopping-cart">
                                    <table className="table-shopping-cart">
                                        <tr className="table_head">
                                            <th className="column-1">Product</th>
                                            <th className="column-2">Name</th>
                                            <th className="column-3">Price</th>
                                            <th className="column-4">Total</th>
                                            <th className="column-5">Remove</th>
                                        </tr>

                                        {cartItems.map((item) => (
                                            <tr className="table_row" key={item.id}>
                                                <td className="column-1">
                                                    <div className="how-itemcart1">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                </td>
                                                <td className="column-2">{item.name}</td>
                                                <td className="column-3">{item.price}</td>
                                                <td className="column-4">{item.price}</td>
                                                <td className="column-5">
                                                    <button onClick={() => handleRemoveItem(item.id)} className="btn-remove">
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
                            <div className="bor10 p-lr-40 p-t30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                                <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

                                <div className="flex-w flex-t bor12 p-b-13">
                                    <div className="size-208">
                                        <span className="stext-110 cl2">Subtotal:</span>
                                    </div>
                                    <div className="size-209">
                                        <span className="mtext-110 cl2">
                                            JOD {cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                                    <div className="size-208 w-full-ssm">
                                        <span className="stext-110 cl2">Shipping:</span>
                                    </div>

                                    <div className="size-209">
                                        <span className="mtext-110 cl2">JOD 2.0</span>
                                    </div>
                                </div>

                                <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                                    <div className="size-208 w-full-ssm">
                                        <span className="stext-110 cl2">Total:</span>
                                    </div>

                                    <div className="size-209">
                                        <span className="mtext-110 cl2">
                                            JOD {(
                                                cartItems.reduce((total, item) => total + parseFloat(item.price), 0) + 2
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="size-209">
                                    <button
                                        className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04"
                                        onClick={() => navigate('/checkout')} 
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Cart;
