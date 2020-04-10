import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../../services/token-service";

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) => {
        console.log({ ...props }, componentProps);

        return TokenService.hasAuthToken() ? (
          <Component {...props} {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: componentProps.location },
            }}
          />
        );
      }}
    />
  );
}
