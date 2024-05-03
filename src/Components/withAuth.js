import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
