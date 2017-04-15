import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPlayground from '../../components/ReactPlayground';
import samples from './samples';

const FormDemo = ({ children }) => (
  <Row>
    <Col xs={12}>
      <h2 className="page-header">Form Example</h2>

      <ReactPlayground codeText={samples.FormExample} />
    </Col>
  </Row>
);

export default FormDemo;