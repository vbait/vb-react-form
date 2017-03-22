import React from 'react';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import Components from './Components';
import DataTableDemo from './Components/DataTableDemo';
import FormsDemo from './Components/FormsDemo';
import Home from './Home';
import { RouteWithSubRoutes, NavBarLink } from '../components';


const NotFound = () => (
  <div className="container">
    <h3>Not found, or in progress ^_^</h3>
  </div>
);

const routes = [
  {
    path: '/',
    Component: Home,
    exact: true,
  },
  {
    path: '/components',
    Component: Components,
    routes: [
      {
        path: '/components/data-table',
        Component: DataTableDemo,
        title: 'DataTable',
      },
      {
        path: '/components/forms',
        Component: FormsDemo,
        title: 'Forms',
      },
    ],
  },
  {
    Component: NotFound,
  },
];

const Demo = () => (
  <Router basename="/react-bizico-components">
    <div>
      <Navbar className="demo-nav">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">React-Bizico-Components</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <ul className="nav navbar-nav">
            <NavBarLink to="/guide">Guide</NavBarLink>
            <NavBarLink to="/components">Components</NavBarLink>
            <li>
              <a href="https://github.com/Bizico/react-bizico-components" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        {routes.map(route => (
          <RouteWithSubRoutes key={route.path || 'notFound'} {...route} />
        ))}
      </Switch>
    </div>
  </Router>
);

export default Demo;
