// src/utils/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // New state to handle loading

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
      }
      setLoading(false); // Finished loading
    };
    initializeAuth();
  }, []);

  const login = (newToken, userData) => {
    setToken(newToken);
    AsyncStorage.setItem('authToken', newToken);
  };

  const logout = () => {
    setToken(null);
    AsyncStorage.removeItem('authToken');
  };

  if (loading) {
    return null; // Render nothing while loading
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
