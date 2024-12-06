import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // Update with your actual API base URL
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
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  // get user orders
  getUserOrders: async () => {
    try {
      const response = await apiClient.get("/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token if needed
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  // get one order for the user

  getOrder: async (id) => {
    try {
      const response = await apiClient.get(`/order/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token if needed
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  // get all products added by one user
  getUserProducts: async () => {
    try {
      const response = await apiClient.get("/products/user");
      return response.data; // Return the products
    } catch (error) {
      console.error("Error fetching user products:", error.response || error);
      throw error; // Rethrow to handle in components
    }
  },

  // get one product
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/product/${id}`);
      return response.data; // Returns product data from the API
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error; // Propagate the error to handle it where this function is called
    }
  },
};

// Error Handler
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status outside 2xx
    const errorMessage =
      error.response.data?.message || "An error occurred. Please try again.";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
    });
  } else if (error.request) {
    // Request was made but no response received
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "Unable to reach the server. Please check your internet connection.",
    });
  } else {
    // Other errors (e.g., during request setup)
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "An unexpected error occurred.",
    });
  }
};



export default apiService;
