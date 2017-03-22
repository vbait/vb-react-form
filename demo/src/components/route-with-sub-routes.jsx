import React, { PropTypes } from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = ({ path, routes, Component }) => (
  <Route
    path={path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <Component {...props} routes={routes} />
    )
  }
  />
);

RouteWithSubRoutes.propTypes = {
  path: PropTypes.string,
  Component: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};

RouteWithSubRoutes.defaultProps = {
  path: '',
  Component: <div />,
  routes: [],
};

export default RouteWithSubRoutes;
