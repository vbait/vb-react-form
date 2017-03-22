import React from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import { Form, Field, RequiredValidator } from '../../../../../src';

class FieldInput extends React.Component {
  onChange = (event) => {
    this.props.onChange(event.target.value, event);
  };
  render() {
    return (
      <input type="text" {...this.props} onChange={this.onChange} />
    )
  };
}

FieldInput.propTypes = {
  onChange: React.PropTypes.func,
};

export default class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Vitalii',
    };
  }

  onInit = (field) => {
    console.log('onInit', field);
  };

  onFocus = (field) => {
    console.log('onFocus', field);
  };

  onBlur = (field) => {
    console.log('onBlur', field);
  };

  onChange = (field) => {
    console.log('onChange', field);
  };

  onUpdate = (field) => {
    console.log('onUpdate', field);
  };

  onRemove = (field) => {
    console.log('onRemove', field);
  };

  updateState = () => {
    this.setState({value: 'Baitaliuk'});
  };

  render() {
    return (
      <div >
        <PageHeader>Forms Demo</PageHeader>

        <Panel header="Basic example">
          <button onClick={this.updateState}>{this.state.value}</button>
          <Field name="firstName"
                 value={this.state.value}
                 validators={[new RequiredValidator()]}
                 onInit={this.onInit}
                 onChange={this.onChange}
                 onFocus={this.onFocus}
                 onBlur={this.onBlur}
                 onUpdate={this.onUpdate}
                 onRemove={this.onRemove}
                 component={FieldInput}>
          </Field>
        </Panel>
        <h6>Better examples and docs coming soon™</h6>
      </div>
    );
  }
}
