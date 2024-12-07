import React, { useEffect, useState } from "react";
import apiService from "../../services/API";
import ProfileSidebar from "./ProfileSidebar";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     id: null, // Ensure formData also contains the product id for updating
//     name: "",
//     description: "",
//     price: "",
//     status: "available",
//     size: "S",
//     image: null,
//   });

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
//   const handleEditClick = (product) => {
//     console.log(product);
//     setFormData({
//       id: product.id, // Set product id to formData
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       status: product.status,
//       size: product.size,
//       image: product.image,
//     });
//   };

  // Handle the delete product click
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

  // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       setFormData({
//         ...formData,
//         [name]: files[0], // Save the file object in the state
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

  // Handle saving the changes to the product
//   const handleSaveChanges = async () => {
//     if (!formData.id) return; // Ensure product id is present

//     const updatedFormData = new FormData();
//     updatedFormData.append("name", formData.name);
//     updatedFormData.append("description", formData.description);
//     updatedFormData.append("price", formData.price);
//     updatedFormData.append("status", formData.status);
//     updatedFormData.append("size", formData.size);
//     console.log(formData);

//     // Add image if it exists
//     if (formData.image && formData.image instanceof File) {
//       updatedFormData.append("image", formData.image);
//     }
//     console.log(updatedFormData);

//     try {
//       const response = await apiService.updateProduct(formData.id, formData);

//       if (response.data?.product) {
//         alert("Product updated successfully!");
//       } else {
//         alert("Failed to update product.");
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update product. Please check your input and try again.");
//     }
//   };

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
                    {/* <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(product)}
                      data-bs-toggle="modal"
                      data-bs-target="#editProductModal"
                    >
                      Edit
                    </button> */}
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

          {/* Edit Product Modal */}
          {/* <div
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
                  {formData ? (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          name="description"
                          value={formData.description}
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
                        {formData.image && !(formData.image instanceof File) && (
                          <div className="mt-2">
                            <img
                              src={formData.image}
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
                          value={formData.size}
                          onChange={handleInputChange}
                        >
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
                          value={formData.price}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="mb-3">
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
          </div>*/}
        </div> 
      </div>
    </div>
  );
}

export default MyProducts;
