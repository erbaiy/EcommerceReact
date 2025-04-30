import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children, requiredRole = null }) => {
  const location = useLocation();

  // Retrieve user authentication info from localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = JSON.parse(localStorage.getItem('user')) || {};

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If role is required and user doesn't have it, redirect based on user's actual role
  if (requiredRole && user?.role !== requiredRole) {
    if (user?.role === 'admin') {
      return <Navigate to="/dashboard/statistics" replace />;
    } else {
      // Regular user/client
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default AuthGuard;
