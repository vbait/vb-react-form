import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPlayground from '../../components/ReactPlayground';
import PropTable from '../../components/PropTable';
import samples from './samples';
import { Field } from '../../../src';

class Example extends React.Component {
  render() {
    return (
      <Field
        name="name"
        className="form-control"
      />
    )
  }
}

const Fields = ({ children }) => (
  <Row>
    <Col xs={12}>
      <h2 className="page-header">Fields</h2>
      <h3>Text Field</h3>
      <Field name="name" className="form-control" />
      <ReactPlayground codeText={samples.Input} />
      <h3>Textarea Field</h3>
      {/*<PropTable component="Field"/>*/}
    </Col>
  </Row>
);

export default Fields;
