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
      <h2 className="page-header">Validators</h2>
      <p><a href="https://www.npmjs.com/package/validator" target="blank">https://www.npmjs.com/package/validator</a></p>
      <h3>Base Validator</h3>
      <ReactPlayground codeText={samples.Validator} />
      <h3>Custom Validator</h3>
      <ReactPlayground codeText={samples.CustomValidator} />
      <h3>Ready Validators</h3>
      <ul>
        <li>EqualValidator</li>
        <li>RequiredValidator</li>
        <li>EmailValidator</li>
        <li>PhoneValidator</li>
        <li>WebSiteValidator</li>
        <li>CurrencyValidator</li>
        <li>PasswordValidator</li>
        <li>MinLengthValidator</li>
        <li>MaxLengthValidator</li>
        <li>MinValueValidator</li>
        <li>MaxValueValidator</li>
      </ul>
      <ReactPlayground codeText={samples.Validators} />
    </Col>
  </Row>
);

export default Fields;
