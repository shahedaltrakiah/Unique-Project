import React, { useEffect, useState } from "react";
import apiService from "../../services/API"; // Adjust the path based on your file structure

const ProfileOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiService.getUserOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total Amount: {order.total_amount}</p>
              <p>Products:</p>
              <ul>
                {order.products.map((product) => (
                  <li key={product.id}>
                    {product.name} - ${product.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default ProfileOrder;
