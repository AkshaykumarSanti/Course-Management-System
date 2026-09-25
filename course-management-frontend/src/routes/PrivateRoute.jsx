import React, { useContext } from "react";
import { UserProvider } from "../context/UserContext";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  let { user } = useContext(UserProvider);
  if (user?.role == "admin") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
export default PrivateRoute;
