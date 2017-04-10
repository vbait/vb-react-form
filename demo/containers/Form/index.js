import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPlayground from '../../components/ReactPlayground';
import samples from './samples';
import {
  Panel,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  OverlayTrigger,
  Popover,
  Glyphicon,
  Button
} from 'react-bootstrap';
import {
  Form, formConnector,
  Field,
  FormField,
  FormFieldErrors,
  FormErrors,
  RequiredValidator,
  EmailValidator,
  PasswordValidator,
  MinLengthValidator,
  RegexValidator,
} from '../../../src';

const FormDemo = ({ children }) => (
  <Row>
    <Col xs={12}>
      <h2 className="page-header">Fields</h2>
      <h3>Base Form</h3>
      <ReactPlayground codeText={samples.Form} />
    </Col>
  </Row>
);

export default FormDemo;