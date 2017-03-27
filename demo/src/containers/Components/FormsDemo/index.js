import React from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import { Field, FormField, RequiredValidator, Form, FormFieldValidator } from '../../../../../src/forms';

export default class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      model: {}
    };
  }

  updateState = () => {
    this.setState({value: 'Baitaliuk'});
  };

  reset = () => {
    this.form.reset({
      username: 'Reset Value',
    });
  };

  onSubmit = (values) => {
    console.log('onSubmit', values);
  };

  render() {
    return (
      <div >
        <PageHeader>Forms Demo</PageHeader>

        <Panel header="Basic example">
          <button onClick={this.updateState}>Initialize Form</button>
          <button onClick={this.reset}>Reset Form</button>

          <Form name="Test" onSubmit={this.onSubmit} ref={(form) => this.form = form}>
            <FormField
              className="form-control"
              name="username"
              value={this.state.value}
              component={Field.Input}
              validators={[new RequiredValidator()]}
            />
            <FormFieldValidator name="username" />
            <button className="btn" type="submit">Send</button>
          </Form>
        </Panel>
        <h6>Better examples and docs coming soon™</h6>
      </div>
    );
  }
}
