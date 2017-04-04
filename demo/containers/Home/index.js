import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPlayground from '../../components/ReactPlayground';
import Samples from '../../Samples';

const Home = ({ children }) => (
  <Row>
    <Col xs={12}>
      HOME
      <ReactPlayground codeText={Samples.Example} />
    </Col>
  </Row>
);

export default Home;
