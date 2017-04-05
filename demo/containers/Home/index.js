import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPlayground from '../../components/ReactPlayground';
import samples from '../../samples';

const Home = ({ children }) => (
  <Row>
    <Col xs={12}>
      <ReactPlayground codeText={samples.Example} />
    </Col>
  </Row>
);

export default Home;
