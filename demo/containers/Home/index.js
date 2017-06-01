import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Home = ({ children }) => (
  <Row>
    <Col xs={12}>
      <p>You can start with <code>yarn</code> or <code>npm install</code></p>
      <p><code>npm run demo</code> - Starts development server with HMR and linting.</p>
      <p><code>npm run build</code> - Builds components.</p>
      <p><code>npm run gh-pages</code> - Builds gh-pages application and updates docs.</p>
      <p><code>npm run test</code> - Runs tests.</p>
    </Col>
  </Row>
);

export default Home;
