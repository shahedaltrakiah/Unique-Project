import React from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Product 1", image: "/assets/images/product-01.jpg", price: "$16.64" },
    { id: 2, name: "Product 2", image: "/assets/images/product-02.jpg", price: "$35.31" },
    { id: 3, name: "Product 3", image: "/assets/images/product-03.jpg", price: "$25.50" },
    { id: 4, name: "Product 4", image: "/assets/images/product-04.jpg", price: "$50.50" },
  ];

  const handleQuickView = (id) => {
    navigate(`/productdetails?id=${id}`);
  };

  return (
    <div className="row isotope-grid">
      {products.map((product) => (
        <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item">
          <div className="block2">
            <div className="block2-pic hov-img0">
              <img src={product.image} alt={product.name} />
              <a
                href="#"
                className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04"
                onClick={(e) => {
                  e.preventDefault();
                  handleQuickView(product.id);
                }}
              >
                Quick View
              </a>
            </div>
            <div className="block2-txt flex-w flex-t p-t-14">
              <div className="block2-txt-child1 flex-col-l">
                <a href="#" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                  {product.name}
                </a>
                <span className="stext-105 cl3">{product.price}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
