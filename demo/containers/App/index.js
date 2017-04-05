import React from 'react';
import {Link, NavLink, Route} from 'react-router-dom';
import {Navbar, Row, Col, ListGroup} from 'react-bootstrap';
import routes from '../routes';

const App = React.createClass({
  getChildContext() {
    return {metadata: App.propData};
  },

  childContextTypes: {
    metadata: React.PropTypes.object,
  },

  render() {
    return (
      <div>
        <Navbar inverse className="navbar-fixed-top">
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
        <div className="container">
          <Row className="row-offcanvas row-offcanvas-right">
            <Col xs={12} sm={9}>
              {routes.map((route, index) => <Route key={index} exact path={route.path} component={route.component} />)}
            </Col>
            <Col xs={12} sm={3} className="sidebar-offcanvas" id="sidebar">
              <ListGroup>
                {routes.map((route, index) => <NavLink key={index} to={route.path} exact
                                                       className="list-group-item">{route.label}</NavLink>)}
              </ListGroup>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
});
class App1 extends React.Component {

  getChildContext() {
    return {metadata: App.propData};
  }

  render() {
    return (
      <div>
        <Navbar inverse className="navbar-fixed-top">
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
        <div className="container">
          <Row className="row-offcanvas row-offcanvas-right">
            <Col xs={12} sm={9}>
              {routes.map((route, index) => <Route key={index} exact path={route.path} component={route.component} />)}
            </Col>
            <Col xs={12} sm={3} className="sidebar-offcanvas" id="sidebar">
              <ListGroup>
                {routes.map((route, index) => <NavLink key={index} to={route.path} exact
                                                       className="list-group-item">{route.label}</NavLink>)}
              </ListGroup>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

App1.childContextTypes = {
  metadata: React.PropTypes.object,
};

export default App;
