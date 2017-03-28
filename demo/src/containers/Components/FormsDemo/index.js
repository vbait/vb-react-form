import React from 'react';
import { Panel, FormGroup, ControlLabel, FormControl, HelpBlock, Overlay, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { Field, FormField, RequiredValidator, Form, formConnector, FormFieldValidator } from '../../../../../src/forms';

class FieldGroup extends React.Component {
  state = {isInvalid: false};

  onValid = (field) => {
    this.setState({isInvalid: field.dirty && field.errors.length});
  };

  render() {
    const {id, label, help, ...props} = this.props;
    const popoverFocus = (<Popover id="popover-trigger-focus">{help}</Popover>);
    let validationState = this.state.isInvalid ? 'error' : null;
    // console.log(form.getFieldByName(props.name));
    return (
      <FormGroup controlId={id} validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        <OverlayTrigger trigger="focus" placement="left" overlay={popoverFocus}>
          <FormField className="form-control" {...props} onValid={this.onValid} />
        </OverlayTrigger>
        <HelpBlock><FormFieldValidator name={props.name} /></HelpBlock>
      </FormGroup>
    );
  }
}

export default class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      firstName: '',
    };
  }

  updateState = () => {
    this.setState({username: 'Baitaliuk'});
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
      <Panel header="Basic example">
        <button onClick={this.updateState}>Initialize Form</button>
        <button onClick={this.reset}>Reset Form</button>

        <Form onSubmit={this.onSubmit} ref={(form) => this.form = form}>
          <FieldGroup
            id="idUsername"
            name="username"
            value={this.state.username}
            component={Field.Input}
            validators={[new RequiredValidator()]}
            label="Username:"
            placeholder="Enter username"
            help="Help text"
          />
          <FieldGroup
            id="idEmail"
            name="email"
            value={this.state.email}
            component={Field.Input}
            validators={[new RequiredValidator()]}
            label="Email:"
            placeholder="Enter email"
            help="Help text for email field"
          />
          <div>
            <FormField
              name="firstName"
              value={this.state.firstName}
              component={Field.Input}
              validators={[new RequiredValidator()]}
            />
            <FormFieldValidator name="firstName" />
          </div>
          <button className="btn" type="submit">Send</button>
        </Form>
      </Panel>
    );
  }
}
