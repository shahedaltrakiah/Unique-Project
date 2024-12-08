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

  getUserProducts: async () => {
    try {
      const token = localStorage.getItem("auth_token"); // Ensure the token name matches
      const response = await apiClient.get("/products/user", { // Adjust the endpoint if needed
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

  // Function to add product to favorites
  addToFavorites: async (productId, token) => {
    try {
      const response = await apiClient.post(
        "/favorites",
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Fetch user's favorite products
  getWishlist: async () => {
    try {
      const response = await apiClient.get('/favorites/user');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId) => {
    const token = localStorage.getItem('auth_token');
    try {
      const response = await apiClient.delete(`/favorites/${productId}`, {  // change this line
        headers: { Authorization: `Bearer ${token}` }
      });
      return response;
    } catch (error) {
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

  getUserData: async (token) => {
    try {
      const response = await apiClient.get(`/user`, {  // change this line
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; // Return the user data on success
    } catch (error) {
      console.error('Error fetching user data:', error.response?.data || error.message);
      throw error; // Propagate the error if needed
    }
  },

  updateProduct: async (id, data) => {
    try {

      // console.log(id);
      console.log(data);
      const token = localStorage.getItem("auth_token"); // Ensure the token name matches
      const response = await apiClient.put(`/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Ensure response.data contains the updated product
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },


  updateUserProfile: async (userData) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("auth_token");

      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      // Perform the API request to update user profile
      const response = await apiClient.put("/user", userData, {
        headers: {
          "Content-Type": "application/json", // Assuming you're sending JSON data
          Authorization: `Bearer ${token}`, // Include the token for authorization
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error.response?.data || error.message);
      throw error; // Propagate the error if needed
    }
  },

  // Fetch products with optional query parameters
  // getProducts: async (params = {}) => {
  //   try {
  //     const response = await apiClient.get("/products", { params }); // Pass query params dynamically
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     throw error;
  //   }
  // },


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
  // getProductsByCategory: async (categoryId, page = 1) => {
  //   try {
  //     const response = await apiClient.get(`/products/category/${categoryId}?page=${page}`);
  //     return response.data; // Returns products filtered by category
  //   } catch (error) {
  //     console.error("Error fetching products by category:", error);
  //     throw error; // Propagate the error
  //   }
  // },

  // Fetch products for the home page (limited with pagination)
  getHomeProducts: async (page = 1) => {
    try {
      const response = await apiClient.get(`/home-products?page=${page}`);
      return response.data; // Return paginated data
    } catch (error) {
      console.error("Error fetching home products:", error);
      throw error;
    }
  },

  // Fetch products for the shop page (all products or filtered by category)
  getShopProducts: async (params = {}) => {
    try {
      const response = await apiClient.get(`/shop-products`, { params }); // Pass query params dynamically
      return response.data; // Return all or filtered data
    } catch (error) {
      console.error("Error fetching shop products:", error);
      throw error;
    }
  },

  placeOrder: async (orderData) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("User is not logged in");

      const response = await apiClient.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
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
