import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ authenticated, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated ? <Component /> : <Redirect to="/" />)}
    />
  );
}

export default ProtectedRoute;
