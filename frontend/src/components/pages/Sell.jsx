import React, { useState } from "react";

const Sell = () => {
  const [formData, setFormData] = useState({
    category: "",
    size: "",
    name: "",
    image: null,
    description: "",
    price: "",
  });

  const [sizeOptions, setSizeOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Dynamically update size options based on category
    if (name === "category") {
      if (value === "Shoes") {
        setSizeOptions(["37", "38", "39", "40", "41", "42", "43"]);
      } else if (value === "Clothes") {
        setSizeOptions(["S", "M", "L", "XL", "XXL"]);
      } else {
        setSizeOptions([]);
      }
      setFormData({ ...formData, size: "" }); // Reset size when category changes
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      // Replace '/sell-product' with your API endpoint
      const response = await fetch("/sell-product", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Product listed successfully!");
      } else {
        alert("Failed to list the product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while listing the product.");
    }
  };

  return (
    <section className="bg0 p-t-104 p-b-116">
      <div className="container">
        <div className="flex-w flex-tr" style={{ width: "2350px" }}>
          {/* Sell Product Form */}
          <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
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
                  <option value="Clothes">Clothes</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Other">Other</option>
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
              <div className="bor8 m-b-20 how-pos4-parent">
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="number"
                  name="price"
                  placeholder="Price (JD)"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <i class="zmdi zmdi-money-box" style={{marginLeft:'25px'}}></i>
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

              {/* Image Upload */}
              <div
                className="bor8 m-b-20 how-pos4-parent"
                style={{ display: "flex", alignItems: "center" }}
              >
                <i
                  className="fa fa-image how-pos4"
                  style={{ marginRight: "10px" }}
                ></i>
                <input
                  className="stext-1111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  required
                  style={{ flex: "1", padding: "10px 60px" }}
                />
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
