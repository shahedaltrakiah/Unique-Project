import React from "react";
import { useSearchParams } from "react-router-dom";

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  const products = [
    { id: 1, name: "Product 1", image: "/assets/images/product-01.jpg", price: "$16.64" },
    { id: 2, name: "Product 2", image: "/assets/images/product-02.jpg", price: "$35.31" },
    { id: 3, name: "Product 3", image: "/assets/images/product-03.jpg", price: "$25.50" },
  ];

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Price: {product.price}</p>
    </div>
  );
};

export default ProductDetails;
