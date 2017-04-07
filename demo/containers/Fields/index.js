import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPlayground from '../../components/ReactPlayground';
import PropTable from '../../components/PropTable';
import samples from './samples';
import { Field, RequiredValidator } from '../../../src';

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

class AsyncValidator {
  isValid(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        value === '111' ? reject(['Async error']) : resolve();
      }, 1000);
    });
  }
}

const Fields = ({ children }) => (
  <Row>
    <Col xs={12}>
      <h2 className="page-header">Fields</h2>
      <h3>Text Field</h3>
      <Field
        name="name"
        validators={[new RequiredValidator()]}
        asyncValidator={new AsyncValidator()}
        onInit={this.onChange}
        onFocus={this.onChange}
        onChange={this.onChange}
        onBlur={this.onChange}
        onUpdate={this.onChange}
        className="form-control"
      />
      <ReactPlayground codeText={samples.Input} />
      <h3>Textarea Field</h3>
      {/*<PropTable component="Field"/>*/}
      <div>
        {`
          name: React.PropTypes.string.isRequired,
          component: React.PropTypes.func,
          onChange: React.PropTypes.func,
          onInit: React.PropTypes.func,
          onUpdate: React.PropTypes.func,
          onFocus: React.PropTypes.func,
          onBlur: React.PropTypes.func,
          value: React.PropTypes.any,
          options: React.PropTypes.arrayOf(React.PropTypes.any),
          validators: React.PropTypes.arrayOf(React.PropTypes.shape({
            isValid: React.PropTypes.func.isRequired,
            error: React.PropTypes.func.isRequired,
          })),
          validatorsOptions: React.PropTypes.shape({
            multi: React.PropTypes.bool,
            validateAfterLocal: React.PropTypes.bool,
          }),
          asyncValidator: React.PropTypes.object,
          asyncValidatorOptions: React.PropTypes.shape({
            validateOn: React.PropTypes.arrayOf(React.PropTypes.string),
          }),
        `}
      </div>
    </Col>
  </Row>
);

export default Fields;
