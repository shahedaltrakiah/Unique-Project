import React, { useState } from "react";
import apiService from "../../services/API";

const Sell = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    size: "",
    image: null,
    sub_images: [],
  });

  const [sizeOptions, setSizeOptions] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "category") {
      if (value === "Shoes") {
        setSizeOptions(["37", "38", "39", "40", "41", "42", "43"]);
      } else if (value === "Tops") {
        setSizeOptions(["S", "M", "L", "XL", "XXL"]);
      } else if (value === "Bottoms") {
        setSizeOptions(["32", "34", "36", "38", "40", "42", "44", "46"]);
      } else {
        setSizeOptions([]);
      }
    }
  };

  const handleImageChange = (event) => {
    const { name, files } = event.target;

    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else if (name === "sub_images") {
      setFormData((prevData) => ({
        ...prevData,
        sub_images: Array.from(files),
      }));
    }
  };

  const categoryMapping = { Tops: 1, Bottoms: 2, Bags: 4, Shoes: 3 };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("category_id", categoryMapping[formData.category]);
    formDataToSubmit.append("size", formData.size);
    formDataToSubmit.append("image", formData.image);
    formDataToSubmit.append("status", "available");

    if (formData.sub_images) {
      Array.from(formData.sub_images).forEach((file) => {
        formDataToSubmit.append("sub_images[]", file);
      });
    }

    try {
      const response = await apiService.createProduct(formDataToSubmit);
      Swal.fire({
        title: "Success!",
        text: "Product added successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log(response);

      // Reset form data after successful submission
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        size: "",
        image: null,
        sub_images: [],
      });
    } catch (error) {
      console.error(error);

      if (error.message === "User is not logged in") {
        Swal.fire({
          title: "Error!",
          text: "You need to log in first to add a product.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add the product. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <section className="bg0 p-t-40 p-b-116">
      <div className="container">
        <div className="flex-w flex-tr">
          <div
            className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md"
            style={{ width: "2350px" }}
          >
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <h4 className="mtext-105 cl2 txt-center p-b-30">
                Sell a Product
              </h4>

              {/* Product Name */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <i className="fa fa-tag how-pos4"></i>
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <i className="fa fa-list how-pos4"></i>
                <select
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Tops">Tops</option>
                  <option value="Bottoms">Bottoms </option>
                  <option value="Bags">Bags</option>
                  <option value="Shoes">Shoes</option>
                </select>
              </div>

              {/* Size Dropdown */}
              <div className="bor8 m-b-20 how-pos4-parent">
                <i className="fa fa-arrows-alt how-pos4"></i>
                <select
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                  disabled={!sizeOptions.length}
                >
                  <option value="" disabled>
                    Select Size
                  </option>
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div
                className="bor8 m-b-20 how-pos4-parent"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src="public/assets/images/icons/price.png"
                  alt="Price"
                  style={{
                    marginLeft: "25px",
                    maxWidth: "20px",
                    marginTop: "10px",
                  }}
                />
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-20 p-r-30"
                  type="number"
                  name="price"
                  placeholder="Price (JD)"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  style={{ marginTop: "10px" }}
                />
              </div>

              {/* Description */}
              <div
                className="bor8 m-b-20 how-pos4-parent"
                style={{ display: "flex", alignItems: "center" }}
              >
                <i
                  className="fa fa-align-left how-pos4"
                  style={{ marginRight: "10px" }}
                ></i>
                <textarea
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  name="description"
                  placeholder="Product Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  style={{
                    flex: "1",
                    minHeight: "100px",
                    padding: "40px 60px",
                  }}
                />
              </div>

              {/* Main Image Upload */}
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "#333",
                  fontSize: "14px",
                }}
              >
                Main Image{" "}
                <span style={{ fontSize: "12px", color: "#888" }}>
                  (required)
                </span>
              </div>
              <div
                className="bor8 m-b-50 how-pos4-parent"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <i
                    className="fa fa-image how-pos4"
                    style={{ marginBottom: "10px" }}
                  ></i>
                  <input
                    id="main-image"
                    className="stext-1111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="file"
                    name="image"
                    placeholder="Main image"
                    onChange={handleImageChange}
                    required
                    style={{ padding: "10px 60px", width: "100%" }}
                  />
                </div>
              </div>

              {/* Sub-Images Upload */}
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "#333",
                  fontSize: "14px",
                }}
              >
                Additional Images{" "}
                <span style={{ fontSize: "12px", color: "#888" }}>
                  (optional)
                </span>
              </div>
              <div
                className="bor8 m-b-50 how-pos4-parent"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <i
                  className="fa fa-image how-pos4"
                  style={{ marginBottom: "10px" }}
                ></i>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <input
                    id="sub-images"
                    className="stext-1111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="file"
                    name="sub_images"
                    placeholder="Sub images"
                    multiple
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        sub_images: [...e.target.files],
                      }));
                    }}
                    style={{ padding: "10px 60px", width: "100%" }}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sell;
