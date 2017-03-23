import React from 'react';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import Components from './Components';
import DataTableDemo from './Components/DataTableDemo';
import FormsDemo from './Components/FormsDemo';
import { RouteWithSubRoutes } from '../components';


const NotFound = () => (
  <div className="container">
    <h3>Not found, or in progress ^_^</h3>
  </div>
);

const routes = [
  {
    path: '/',
    Component: Components,
    routes: [
      {
        path: '/data-table',
        Component: DataTableDemo,
        title: 'DataTable',
      },
      {
        path: '/forms',
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
  <Router basename="/">
    <div>
      <Navbar className="demo-nav">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">React Forms</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <ul className="nav navbar-nav">
            <li>
              <a href="https://github.com/vbait/vb-react-form" target="_blank" rel="noopener noreferrer">
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
