import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Home = ({ children }) => (
  <Row>
    <Col xs={12}>
      <p>You can start with <code>yarn</code> or <code>npm install</code></p>
      <p><code>yarn run start</code> - Starts development server with HMR and linting.</p>
      <p><code>yarn run build</code> - Builds components.</p>
      <p><code>yarn run lint</code> - Runs linting.</p>
      <p><code>yarn run test</code> - Runs tests.</p>
      <p><code>yarn run test:watch</code> - Starts watch for tests.</p>
      <p><code>yarn run pages</code> - Builds gh-pages application and updates docs.</p>
    </Col>
  </Row>
);

export default Home;
