import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import { RouteWithSubRoutes, NavBarLink } from '../../components';

const Components = ({ routes }) => (
  <div className="container">
    <Row>
      <Col md={2}>
        <ul className="nav nav-stacked nav-pills">
          {routes.map(route => (
            <NavBarLink key={route.title} to={route.path}>{route.title}</NavBarLink>
          ))}
        </ul>
      </Col>
      <Col md={10}>
        {routes.map(route => (
          <RouteWithSubRoutes key={route.title} {...route} />
        ))}
      </Col>
    </Row>
  </div>
);


Components.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Components;
