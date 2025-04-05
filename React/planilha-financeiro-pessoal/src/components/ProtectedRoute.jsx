import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
 
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }
 
  return <Outlet />;
};


const isTokenExpired = (token) => {
  if (!token) return true;  

  try {
    const decoded = jwtDecode(token);  
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime; // Check if the token is expired
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // If decoding fails, consider the token expired
  }
};

export default ProtectedRoute;