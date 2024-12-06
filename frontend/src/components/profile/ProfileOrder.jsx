import React from "react";
import "./Profile.css";



function ProfileOrder(){
return(
  
<>
  <div className="order-card card" id="orderHistory">
    <h4>Order History</h4>
    <table className="table order-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#order_id</td>
          <td>order_date </td>
          <td>status</td>
          <td> JDtotal_amount</td>
          <td>
            <button className="view-details-btn" >
              View Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="modal fade">
   <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            Order Details
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <div className="order-details">
            <h5>
              Order ID
              <span className="text-primary">
              </span>
            </h5>
            <p>
              <strong>Date:</strong>{" "}
              <span className="text-muted">
              </span>
            </p>
            <p>
              <strong>Status:</strong>
            </p>
            <p>
              <strong>Total:</strong>
              <span className="text-danger">
                
                JD 
              </span>
            </p>
            <p>
              <strong>Shipping Address:</strong>
              <span className="text-muted">
              </span>
            </p>
            <p>
              <strong>Items Ordered:</strong>
            </p>
            <div className="order-items">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  product_name
                  <span className="badge bg-secondary">
                    
                    JD 
                  </span>
                </li>
              </ul>
            </div>
            <p>
              <strong>Time Left to Cancel:</strong>{" "}
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-danger"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  </div>
</>



      );}

export default ProfileOrder;