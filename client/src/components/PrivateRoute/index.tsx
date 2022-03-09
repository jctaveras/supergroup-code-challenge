import React, { FunctionComponent } from "react";
import { Navigate } from 'react-router-dom';
import { useGlobalState } from "../../context/globa-context";

const PrivateRoute: FunctionComponent = ({ children }) => {
  const state = useGlobalState();

  if (!state.User) return <Navigate to="/login" replace />;

  return children as React.ReactElement;
};

export default PrivateRoute;
