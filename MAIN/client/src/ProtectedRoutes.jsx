
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthToken } from "./Helpers";

const ProtectedRoutes = () => {
  let location = useLocation();

  let auth = getAuthToken().user;
//   let admin = auth ? auth.role === "admin" : false;
  if (auth) return <Outlet />;
  else return <Navigate to="/login" />;
};
export default ProtectedRoutes;