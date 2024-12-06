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
      return response.data; 
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
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
