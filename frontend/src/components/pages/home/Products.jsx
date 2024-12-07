import React, { useEffect, useState } from "react";
import apiService from "../../../services/API"; // Adjust path as needed
import Cookies from "js-cookie";
function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

 

  useEffect(() => {
    apiService
      .getProducts()
      .then(setProducts)
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      });
      
    const cartData = getCartItems(); // جلب بيانات السلة
    setCartItems(cartData);
  }, []);
  
  const getCartItems = () => {
    return JSON.parse(Cookies.get('cart') || '[]'); // استرجاع البيانات من الكوكيز أو إرجاع مصفوفة فارغة
  };
  const handleAddToCart = (product) => {
    try {
        let cart = JSON.parse(Cookies.get('cart') || '[]');
        const existingProduct = cart.find((item) => item.id === product.id); // التأكد من وجود المنتج باستخدام الـ id

        if (!existingProduct) {
            cart.push(product); // إضافة المنتج الكامل إلى السلة
            Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
            setCartItems(cart);
            alert('تم إضافة المنتج إلى السلة!');
        } else {
            alert('المنتج موجود بالفعل في السلة!');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('حدث خطأ أثناء الإضافة إلى السلة.');
    }
};
  return (
    <section className="bg0 p-t-23 p-b-140">
      <div className="container">
        <div className="p-b-10">
          <h3 className="ltext-103 cl5">Product Overview</h3>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="row isotope-grid">
          {products.map((product) => (
            <div
              className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
              key={product.id}
            >
              {/* Block2 */}
              <div className="block2">
                <div className="block2-pic hov-img0">
                  <img src={product.image} alt={product.name} />
                  <a
                    href="#"
                    className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  >
                    Quick View
                  </a>
                </div>
                <div className="block2-txt flex-w flex-t p-t-14">
                  <div className="block2-txt-child1 flex-col-l">
                    <a
                      href="#"
                      className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    >
                      {product.name}
                    </a>
                    <span className="stext-105 cl3">{product.price}</span>
                  </div>
                  <div className="block2-txt-child2 flex-r p-t-3">
                    <a
                      href="#"
                      className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    >
                      <img
                        className="icon-heart1 dis-block trans-04"
                        src="/assets/images/icons/icon-heart-01.png"
                        alt="ICON"
                      />
                      <img
                        className="icon-heart2 dis-block trans-04 ab-t-l"
                        src="/assets/images/icons/icon-heart-02.png"
                        alt="ICON"
                      />
                    </a>
                    <button
                      className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                      onClick={() => handleAddToCart(product)}
                    >
                      <img
                        className="icon-cart1 dis-block trans-04"
                        src="/assets/images/icons/icon-cart-01.png"
                        alt="ICON"
                      />
                      <img
                        className="icon-cart2 dis-block trans-04 ab-t-l"
                        src="/assets/images/icons/icon-cart-02.png"
                        alt="ICON"
                      />
                    </button>
                  </div>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
