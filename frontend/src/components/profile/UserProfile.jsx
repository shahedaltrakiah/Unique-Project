import React, { useState, useEffect } from 'react';
import apiService from './api'; // Path to your api.js file

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const data = await apiService.getUserData(userId);
        setUser(data.data); // Set the user data in the state
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred');
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          {/* Display other user information here */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
