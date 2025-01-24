import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return <>{isLoggedIn ? children : <Navigate replace to={"/login"} />}</>;
};

export default ProtectedRoute;
