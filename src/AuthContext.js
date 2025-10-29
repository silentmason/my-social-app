import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for token in local storage on component mount
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token with backend, store user if valid.
      // Replace this with your backend validation logic
      const storedUser = { username: 'exampleUser'}; // Replace with your backend responsee
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);


  const login = async (username, password) => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token
        setIsLoggedIn(true);
        setUser({ username: username }); // Replace with actual user data from the API
        return true; // Indicate successful login
      } else {
        // Handle login error
        console.error('Login failed');
        return false; // Indicate failed login
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
