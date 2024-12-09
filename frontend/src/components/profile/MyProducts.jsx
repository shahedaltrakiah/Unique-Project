import React, { useEffect, useState } from "react";
import apiService from "../../services/API";
import ProfileSidebar from "./ProfileSidebar";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    status: "available",
    size: "S",
    image: "",
  });

  // Fetch products on component mount
  useEffect(() => {
    apiService
      .getUserProducts()
      .then(setProducts)
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      });
  }, []);

  // Handle the click to edit product
  const handleEditClick = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      status: product.status,
      size: product.size,
    });
  };

  // Handle the delete product click
  // Handle the delete product click
  const handleDeleteClick = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this product? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        apiService
          .deleteProduct(productId)
          .then(() => {
            setProducts(products.filter((product) => product.id !== productId));
            Swal.fire("Deleted!", "The product has been deleted.", "success");
          })
          .catch((err) => {
            console.error("Error deleting product:", err);
            Swal.fire(
              "Failed!",
              "Failed to delete the product. Please try again.",
              "error"
            );
          });
      }
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0], // Store the image file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle saving the changes to the product
  const handleSaveChanges = async () => {
    if (!formData.id) {
      Swal.fire("Error!", "Product ID is missing!", "error");
      return;
    }

    try {
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("description", formData.description);
      updateData.append("price", formData.price);
      updateData.append("status", formData.status);
      updateData.append("size", formData.size);
      if (formData.image) {
        updateData.append("image", formData.image);
      }

      const response = await apiService.updateProduct(formData.id, updateData);

      if (response) {
        Swal.fire("Success!", "Product updated successfully!", "success");
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === formData.id ? { ...product, ...response } : product
          )
        );
      } else {
        Swal.fire("Failed!", "Failed to update the product.", "error");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire(
        "Failed!",
        "An error occurred while updating the product. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <ProfileSidebar />
        </div>

        <div className="col-md-9 profile-card ">
          <h3 className="title mt-4 mb-4">Products List</h3>
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
                      src={`${product.image}`}
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
                      <i className="fas fa-edit"></i>{" "}
                      {/* Font Awesome Edit Icon */}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      <i className="fas fa-trash"></i>{" "}
                      {/* Font Awesome Trash Icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Product Modal */}
          <div
            className="modal fade"
            id="editProductModal"
            tabIndex="-1"
            aria-labelledby="editProductModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#717fe0" }}
                >
                  <h5
                    className="modal-title"
                    id="editProductModalLabel"
                    style={{ color: "white" }}
                  >
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
                  {formData ? (
                    <>
                      {/* Name and Status in the same line */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                          >
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                          </select>
                        </div>
                      </div>

                      {/* Size and Price in the same line */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Size</label>
                          <select
                            className="form-select"
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                          >
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Price (JD)</label>
                          <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* Description alone */}
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* Image Upload */}
                      <div className="mb-3">
                        <label className="form-label">Image</label>
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              image: e.target.files[0],
                            })
                          }
                        />
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
                    className="btn btn-save"
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
