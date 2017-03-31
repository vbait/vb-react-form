import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import { Navbar, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Home from '../Home';
import FormsDemo from '../FormsDemo';

const App = ({route}) => (
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
          <Route exact path="/" component={Home}/>
          <Route path="/forms" component={FormsDemo}/>
        </Col>
        <Col xs={12} sm={3} className="sidebar-offcanvas" id="sidebar">
          <ListGroup>
            <NavLink to="/" exact className="list-group-item">Home</NavLink>
            <NavLink to="/forms" exact className="list-group-item">Link 3</NavLink>
          </ListGroup>
        </Col>
      </Row>
    </div>
  </div>
);

export default App;
