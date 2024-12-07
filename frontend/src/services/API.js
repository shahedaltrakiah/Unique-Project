import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token'); // Adjust with your token storage mechanism
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to request headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


const apiService = {

  // Register User
  registerUser: async (data) => {
    try {
      const response = await apiClient.post("/register", data);
      // Store token (In localStorage)
      localStorage.setItem("auth_token", response.data.token);
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
      // Store token (In localStorage)
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
      if (!token) {
        throw new Error("User is not logged in");
      }
      const response = await apiClient.post("/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      throw error; 
    }
  },  

  // get user orders
  getUserOrders: async () => {
    try {
      const token = localStorage.getItem("auth_token"); // Ensure the token name matches
      const response = await apiClient.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the correct auth token
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
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Include auth token if needed
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
      handleApiError(error);
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
  addToFavorite: async (data) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await apiClient.post("/favorites", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await apiClient.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      throw error;
    }
  },

  getUserData: async (id) => {
    try {
      const response = await apiClient.get(`/user/${id}`);
      return response.data; // Return the user data on success
    } catch (error) {
      console.error('Error fetching user data:', error.response?.data || error.message);
      throw error; // Propagate the error if needed
    }
  },

  updateUserProfile: async (userData) => {
    try {
      const response = await axios.patch('/api/user/update', userData, {
        headers: {
          'Content-Type': 'multipart/form-data', // If you're uploading files
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error.response?.data || error.message);
      throw error; // Propagate the error if needed
    }
  },

  // Fetch all products
  getProducts: async (page = 1) => {
    try {
      const response = await apiClient.get(`/products?page=${page}`);
      return response.data; // Return paginated data
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  

// send Message contact Us

sendMessage: async (data) => {
  try {
    const response = await apiClient.post("/messages", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
},


  // Fetch all categories
getCategories: async () => {
  try {
    const response = await apiClient.get("/categories");
    return response.data; // Returns categories data from the API
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Propagate the error to handle it where this function is called
  }
},

// Fetch all products by category
getProductsByCategory: async (categoryId, page = 1) => {
  try {
    const response = await apiClient.get(`/products/category/${categoryId}?page=${page}`);
    return response.data; // Returns products filtered by category
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error; // Propagate the error
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
