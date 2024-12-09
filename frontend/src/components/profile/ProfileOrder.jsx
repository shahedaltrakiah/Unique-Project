import React, { useEffect, useState } from "react";
import "./Profile.css";
import ProfileSidebar from "./ProfileSidebar";
import apiService from "../../services/API"; // Adjust path as needed

function ProfileOrder() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders on component mount
  useEffect(() => {
    apiService
      .getUserOrders()
      .then(setOrders)
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders.");
      });
  }, []);

  // Handle selecting an order for the modal
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="main-container">
      <div className="row"> 
      <div className="col-md-3">
          <ProfileSidebar />
        </div>        
        <div className="col-md-9 profile-card"> 
          <h3 className="title mt-4 mb-4">Order History</h3>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <table className="table order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.address}</td>
                  <td>{order.phone}</td>
                  <td>JD {order.total_amount.toFixed(2)}</td>
                  <td>
                    <button
                      className="view-details-btn"
                      onClick={() => handleViewDetails(order)} // This sets the selected order
                      data-bs-toggle="modal"
                      data-bs-target="#orderDetailsModal" // Ensure this ID matches the modal ID
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for editing order details */}
          {selectedOrder && (
            <div
              className="modal fade"
              id="orderDetailsModal"
              tabIndex="-1"
              aria-labelledby="orderDetailsModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header" style={{backgroundColor: "#717fe0"}}>
                    <h5 className="modal-title" id="orderDetailsModalLabel"
                    style={{color:'white'}}>
                      Order Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="order-details">
                      <p style={{fontSize:'20px', color:'#717fe0'}}>
                        <strong>Order ID:</strong> #{selectedOrder.id}
                      </p>
                      <p>
                        <strong>Address:</strong> {selectedOrder.address}
                      </p>
                      <p>
                        <strong>Phone:</strong> {selectedOrder.phone}
                      </p>
                      <p>
                        <strong>Total Amount:</strong> 
                        <span className="text-danger"> JD{" "}
                        {selectedOrder.total_amount.toFixed(2)}</span>
                      </p>
                      <p>
                        <strong>Products:</strong>
                      </p>
                      <div className="order-items">
                        <ul className="list-group">
                          {selectedOrder.products.map((product, index) => (
                            <li
                              key={index}
                              className="list-group-item d-flex justify-content-between align-items-start"
                            >
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">{product.name}</div>
                                <p>Size: {product.size}</p>
                                <p>Price: JD {product.price.toFixed(2)}</p>
                              </div>
                              <img
                                src={`assets/images/${product.image}`}
                                alt={product.name}
                                className="img-thumbnail"
                                style={{ width: "80px", height: "80px" }}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default ProfileOrder;
