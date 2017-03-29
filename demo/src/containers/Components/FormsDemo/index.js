import React from 'react';
import { Panel, FormGroup, ControlLabel, HelpBlock, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import {
  Form,
  Field,
  FormField,
  FormFieldValidator,
  RequiredValidator,
  EmailValidator,
  PhoneValidator,
  WebSiteValidator,
  CurrencyValidator,
  PasswordValidator,
  MinLengthValidator,
  MaxLengthValidator,
  MinValueValidator,
  MaxValueValidator,
} from '../../../../../src/forms';

class FieldGroup extends React.Component {
  state = {isInvalid: false};

  onValid = (field) => {
    this.setState({isInvalid: field.dirty && field.errors.length});
  };

  render() {
    const {id, label, help, ...props} = this.props;
    const popoverFocus = (<Popover id="popover-trigger-focus">{help}</Popover>);
    let validationState = this.state.isInvalid ? 'error' : null;

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
      text: '',
      email: '',
      firstName: '',
      phone: '12025550174',
    };
  }

  updateState = () => {
    this.setState({text: 'Baitaliuk'});
  };

  reset = () => {
    this.form.reset({
      text: 'Reset Value',
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
            id="idText"
            name="text"
            value={this.state.text}
            component={Field.Input}
            validators={[new RequiredValidator()]}
            label="Text:"
            placeholder="Enter text"
            help="Help text for text field"
          />
          <FieldGroup
            id="idEmail"
            name="email"
            type="email"
            value={this.state.email}
            validators={[new RequiredValidator(), new EmailValidator()]}
            validatorsOptions={{multi: true}}
            label="Email:"
            placeholder="Enter email"
            help="Help text for email field"
          />
          <FieldGroup
            id="idPassword"
            name="password"
            type="password"
            value={this.state.password}
            validators={[new RequiredValidator(), new MinLengthValidator(6), new PasswordValidator()]}
            label="Password:"
            placeholder="Enter password"
            help="Help text for password field"
          />
          <FieldGroup
            id="idPhone"
            name="phone"
            value={this.state.phone}
            validators={[new RequiredValidator(), new PhoneValidator('en-US')]}
            label="Phone:"
            placeholder="Enter phone"
            help="Help text for phone field"
          />
          <button className="btn" type="submit">Send</button>
        </Form>
      </Panel>
    );
  }
}
