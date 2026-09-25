import React, { Children, useContext } from "react";
import { UserProvider } from "../context/UserContext";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  let { user } = useContext(UserProvider);
  if (user) {
    return children;
  } else {
   return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
