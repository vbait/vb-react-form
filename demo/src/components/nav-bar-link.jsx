import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';


const NavBarLink = ({ children, ...props }) => (
  <li>
    <NavLink activeClassName={'active'} {...props}>{children}</NavLink>
  </li>
);

NavBarLink.propTypes = {
  children: PropTypes.node,
};

NavBarLink.defaultProps = {
  children: null,
};

export default NavBarLink;
