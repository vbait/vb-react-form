import React from 'react';
import { Jumbotron, Button, Panel, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <Jumbotron>
      <div className="container">
        <h1>Welcome!</h1>
        <p>
          This is a collection of React components that we happened to build during our development endeavors.
        </p>
      </div>
    </Jumbotron>
    <div className="container">
      <Row>
        <Col md={4}>
          <Panel header={'Data table'} bsStyle="primary">
            <p>
              Customizable data table with expand, ordering, and nesting features.
            </p>

            <Link to="/components/data-table">
              <Button className="pull-right">View Demo</Button>
            </Link>
          </Panel>
        </Col>
        <Col md={4}>
          <Panel header={'Soon™'} bsStyle="primary">
            <p>
              Soon™.
            </p>

            <Link to="/components/soon">
              <Button className="pull-right">View Demo</Button>
            </Link>
          </Panel>
        </Col>
      </Row>
    </div>
  </div>
);

export default Home;
