import React, { useEffect, useState } from "react";
import apiService from "../../services/API"; // Adjust the path based on your file structure
import { useParams } from "react-router-dom"; // If using React Router for dynamic routing

const OrderDetails = () => {
  const { id } = useParams(); // Assuming the order ID is passed via route params
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await apiService.getOrder(id);
        setOrder(data.data); // Assuming your API response wraps the order data in a `data` object
      } catch (err) {
        setError(err.message || "Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Order Details</h1>
      {console.log(order)}
      {order ? (
        <div>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Total Amount:</strong> ${order.total_amount}</p>
          <p><strong>Products:</strong></p>
          <ul>
            {order.products.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No order details found.</p>
      )}
    </div>
  );
};

export default OrderDetails;
