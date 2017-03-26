import React from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import { Field, ModelField, RequiredValidator } from '../../../../../src';
import {Form} from "../../../../../src/forms/index";

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
      model: {}
    };
    this.form = {

    };
  }

  updateState = () => {
    this.setState({value: 'Baitaliuk'});
  };

  onSubmit = (values) => {
    console.log('onSubmit', values);
  };

  render() {
    return (
      <div >
        <PageHeader>Forms Demo</PageHeader>

        <Panel header="Basic example">
          <button onClick={this.updateState}>{this.state.value}</button>

          <Form name="Test" onSubmit={this.onSubmit}>
            <div>
              <ModelField
                name="username"
                value={this.state.value}
                component={Field.Input}
                validators={[new RequiredValidator()]}
              />
            </div>
            <button type="submit">Send</button>
          </Form>
        </Panel>
        <h6>Better examples and docs coming soon™</h6>
      </div>
    );
  }
}
