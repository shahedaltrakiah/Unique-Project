import React, { useEffect, useState } from "react";
import apiService from "../../services/API";
import ProfileSidebar from "./ProfileSidebar";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    setSelectedProduct({ ...product }); // Open modal with selected product
  };

  const handleDeleteClick = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      apiService
        .deleteProduct(productId)
        .then(() => {
          setProducts(products.filter((product) => product.id !== productId));
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
          alert("Failed to delete product. Please try again.");
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      // Handle file input (for images)
      setSelectedProduct({
        ...selectedProduct,
        [name]: files[0], // Save the file object in the state
      });
    } else {
      // Handle text inputs
      setSelectedProduct({
        ...selectedProduct,
        [name]: value,
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
  
    // Add image if it exists
    if (selectedProduct.image && selectedProduct.image instanceof File) {
      formData.append("image", selectedProduct.image);
    }
  
    try {
      console.log("Sending data to API", formData);  // Log FormData before sending
      const response = await apiService.updateProduct(selectedProduct.id, formData);
      
      console.log("Response from API:", response);
      
      if (response.data?.product) {
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please check your input and try again.");
    }
  };
  
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <ProfileSidebar />
        </div>

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
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
                          name="name"
                          value={selectedProduct.name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          name="description"
                          value={selectedProduct.description}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Main Image</label>
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          onChange={handleInputChange}
                        />
                        {selectedProduct.image && !(selectedProduct.image instanceof File) && (
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

                      <div className="mb-3">
                        <label className="form-label">Size</label>
                        <select
                          className="form-select"
                          name="size"
                          value={selectedProduct.size}
                          onChange={handleInputChange}
                        >
                          {/* Example options, change as needed */}
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Price (JD)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={selectedProduct.price}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                          className="form-select"
                          name="status"
                          value={selectedProduct.status}
                          onChange={handleInputChange}
                        >
                          <option value="available">Available</option>
                          <option value="sold">Sold</option>
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
