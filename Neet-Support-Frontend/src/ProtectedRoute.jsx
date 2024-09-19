import { Navigate, useLocation } from "react-router-dom";
import React from "react";

export default function ProtectedRoute({ children }) {
  const { pathname } = useLocation();
  const isAuth = !!sessionStorage.getItem("authToken");
  const authToken = sessionStorage.getItem("authToken");
  const BaseURL = import.meta.env.VITE_API_URL;

  // Asynchronous function to verify token
  const verifyToken = async () => {
    try {
      const response = await fetch(`${BaseURL}/auth/verifyToken`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.status === 200;
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }
  };

  // Effect to handle the route protection
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const result = await verifyToken();
      setIsAuthenticated(result);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Loading state or you can show a loader here
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/signup" replace state={{ referrer: pathname }} />;
}
