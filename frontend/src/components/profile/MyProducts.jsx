import React, { useEffect, useState } from "react";
import apiService from "../../services/API"; // Adjust path if needed
import ProfileSidebar from "./ProfileSidebar";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // For Edit Modal

  useEffect(() => {
    apiService
      .getUserProducts()
      .then(setProducts)
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      });
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product); // Open modal with selected product
  };

  const handleDeleteClick = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      apiService
        .deleteProduct(productId) // Replace with your API call for deletion
        .then(() => {
          setProducts(products.filter((product) => product.id !== productId)); // Remove from UI
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
          alert("Failed to delete product. Please try again.");
        });
    }
  };

  return (
    <div className="container mt-5">
        <ProfileSidebar/>
      <h4>Products List</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Size</th>
            <th>Price (JD)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.size}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.status}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEditClick(product)}
                  data-bs-toggle="modal"
                  data-bs-target="#editProductModal"
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteClick(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="editProductModal"
        tabIndex="-1"
        aria-labelledby="editProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editProductModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedProduct ? (
                <>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedProduct.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Size</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedProduct.size}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price (JD)</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={selectedProduct.price}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" defaultValue={selectedProduct.status}>
                      <option value="Available">Available</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </>
              ) : (
                <p>Loading product details...</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-success">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
