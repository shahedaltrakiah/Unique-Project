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

  const handleSaveChanges = async () => {
    if (!selectedProduct) return;

    const formData = new FormData();
    formData.append("name", selectedProduct.name);
    formData.append("description", selectedProduct.description);
    formData.append("price", selectedProduct.price);
    formData.append("status", selectedProduct.status);
    formData.append("size", selectedProduct.size);
    const mainImageInput = document.querySelector("#mainImageInput");
    if (mainImageInput?.files?.[0]) {
      formData.append("image", mainImageInput.files[0]);
    }

    try {
      const updatedProduct = await apiService.updateProduct(
        selectedProduct.id,
        formData
      );
      console.log("Product updated successfully:", updatedProduct);

      alert("Product updated successfully!");
      // Optionally, close the modal or refresh the product list
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product. Please check your input and try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <ProfileSidebar />
        </div>

        {/* Main content area */}
        <div className="col-md-9">
          <h4>Products List</h4>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <table className="table order-table">
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
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.size}</td>
                  <td>{product.price.toFixed(2)}</td>
                  <td>{product.status}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(product)}
                      data-bs-toggle="modal"
                      data-bs-target="#editProductModal"
                    >
                      Edit
                    </button>
                    <button
                      className=" btn-danger btn"
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
                      {/* Name */}
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={selectedProduct.name}
                        />
                      </div>

                      {/* Description */}
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          defaultValue={selectedProduct.description}
                        />
                      </div>

                      {/* Main Image */}
                      <div className="mb-3">
                        <label className="form-label">Main Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                        />
                        {selectedProduct.image && (
                          <div className="mt-2">
                            <img
                              src={selectedProduct.image}
                              alt="Product"
                              className="img-thumbnail"
                              style={{ width: "100px" }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Size Dropdown */}
                      <div className="mb-3">
                        <label className="form-label">Size</label>
                        {selectedProduct.category.name === "bottoms" ||
                        selectedProduct.category.name === "shoes" ? (
                          <select
                            className="form-select"
                            defaultValue={selectedProduct.size}
                          >
                            {[...Array(16).keys()].map((i) => (
                              <option key={i + 30} value={i + 30}>
                                {i + 30}
                              </option>
                            ))}
                          </select>
                        ) : selectedProduct.category.name === "tops" ? (
                          <select
                            className="form-select"
                            defaultValue={selectedProduct.size}
                          >
                            {["S", "M", "L", "XL", "XXL", "XXXL"].map(
                              (size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={selectedProduct.size}
                            readOnly
                          />
                        )}
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <label className="form-label">Price (JD)</label>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={selectedProduct.price}
                        />
                      </div>

                      {/* Status */}
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                          className="form-select"
                          defaultValue={selectedProduct.status}
                        >
                          <option value="available">Available</option>
                          <option value="sold">Sold</option>
                        </select>
                      </div>
                      {/* Sub Images */}
                      {/* <div className="mb-3">
                        <label className="form-label">Sub Images</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          multiple
                          // You can handle the upload of sub-images here
                        />
                        {selectedProduct.productImages &&
                          selectedProduct.productImages.length > 0 && (
                            <div className="mt-2">
                              {selectedProduct.productImages.map(
                                (image, index) => (
                                  <div
                                    key={index}
                                    className="d-inline-block me-2"
                                  >
                                    <img
                                      src={image.image_path}
                                      alt={`Sub Image ${index + 1}`}
                                      className="img-thumbnail"
                                      style={{ width: "100px" }}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          )}
                      </div> */}
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
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
