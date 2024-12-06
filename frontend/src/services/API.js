import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

const apiService = {
  // Register User
  registerUser: async (data) => {
    try {
      const response = await apiClient.post("/register", data);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  // Login User
  loginUser: async (data) => {
    try {
      const response = await apiClient.post("/login", data);
      // Store token (for example, in localStorage)
      localStorage.setItem("auth_token", response.data.token); 
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  // Create Product
  createProduct: async (data) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("User is not logged in");
  
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('category_id', data.category_id);
      formData.append('status', data.status);
      formData.append('image', data.image);
  
      if (data.sub_images) {
        data.sub_images.forEach((image, index) => {
          formData.append(`sub_images[${index}]`, image);
        });
      }
  
      const response = await apiClient.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }  
};

// Error Handler
const handleApiError = (error) => {
  if (error.response) {
    const errorMessage =
      error.response.data?.message || "An error occurred. Please try again.";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
    });
  } else if (error.request) {
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "Unable to reach the server. Please check your internet connection.",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "An unexpected error occurred.",
    });
  }
};

export default apiService;
