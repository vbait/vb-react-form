import React from 'react';
import { Panel, FormGroup, FormControl, ControlLabel, HelpBlock, OverlayTrigger, Popover, Glyphicon, Button } from 'react-bootstrap';
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
} from '../../../src';

class AsyncValidator {
  isValid(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        value === '1' ? reject(['Async error']) : resolve();
      }, 1000);
    });
  }
}

class FieldGroup extends React.Component {
  state = {isInvalid: false};

  onValid = (field) => {
    this.setState({
      isInvalid: field.dirty && (field.errors.length || field.asyncErrors.length),
      dirty: field.dirty,
      pending: field.pending,
    });
  };

  render() {
    const {id, label, help, ...props} = this.props;
    const {isInvalid, pending, dirty} = this.state;
    const popover = (<Popover id="popover-focus">{help}</Popover>);
    let validationState = (isInvalid) ? 'error' : 'success';

    return (
      <FormGroup controlId={id} validationState={dirty && !pending ? validationState : null}>
        <ControlLabel>{label}</ControlLabel>
        <OverlayTrigger trigger="focus" placement="left" overlay={popover}>
          <div className="input-container">
            <FormField className="form-control" {...props} onValid={this.onValid} />
            <FormControl.Feedback>
              {pending && <Glyphicon glyph="repeat fast-right-spinner" />}
            </FormControl.Feedback>
          </div>
        </OverlayTrigger>
        <HelpBlock><FormFieldValidator name={props.name} /></HelpBlock>
      </FormGroup>
    );
  }
}

class FieldRadioGroup extends React.Component {
  render() {
    const {label, help, ...props} = this.props;
    const popover = (<Popover id="popover-hover">{help}</Popover>);

    return (
      <div className="radio">
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
          <label>
            <FormField {...props} /> {label}
          </label>
        </OverlayTrigger>
      </div>
    );
  }
}

class FieldCheckboxGroup extends React.Component {
  render() {
    const {label, help, ...props} = this.props;
    const popover = (<Popover id="popover-hover">{help}</Popover>);

    return (
      <div className="checkbox has-error">
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
          <label>
            <FormField {...props} /> {label}
          </label>
        </OverlayTrigger>
      </div>
    )
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
      checkbox: '1',
      formProps: {},
    };
  }

  updateState = () => {
    this.setState({text: 'Baitaliuk'});
  };

  reset = () => {
    this.form.reset();
  };

  onSubmit = (values) => {
    console.log('onSubmit', values);
  };

  onValid = (props) => {
    this.setState({formProps: props});
  };

  render() {
    return (
      <Panel header="Basic example">
        <button onClick={this.updateState}>Initialize Form</button>
        <button onClick={this.reset}>Reset Form</button>

        <Form onSubmit={this.onSubmit} onValid={this.onValid} ref={(form) => this.form = form}>
          <FieldGroup
            id="idText"
            name="text"
            value={this.state.text}
            component={Field.Input}
            validators={[new RequiredValidator()]}
            validatorsOptions={{multi: true}}
            asyncValidator={new AsyncValidator()}
            asyncValidatorOptions={{validateOn: ['blur'], validateAfterLocal: true}}
            label="Text"
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
            label="Email"
            placeholder="Enter email"
            help="Help text for email field"
          />
          <FieldGroup
            id="idPassword"
            name="password"
            type="password"
            value={this.state.password}
            validators={[new RequiredValidator(), new MinLengthValidator(6), new PasswordValidator(false)]}
            validatorsOptions={{multi: false}}
            label="Password"
            placeholder="Enter password"
            help="Help text for password field"
          />
          <FieldGroup
            id="idPhone"
            name="phone"
            value={this.state.phone}
            validators={[new RequiredValidator(), new PhoneValidator('en-US')]}
            label="Phone"
            placeholder="Enter phone"
            help="Help text for phone field"
          />
          <FieldRadioGroup
            id="idRadio"
            name="radio"
            type="radio"
            value={this.state.radio}
            label="Radio"
            help="Help text for radio field"
          />
          <FieldCheckboxGroup
            id="idCheckbox"
            name="checkbox"
            type="checkbox"
            value={this.state.checkbox}
            label="Checkbox"
            help="Help text for checkbox field"
            validators={[new RequiredValidator()]}
          />
          <button className="btn" type="submit">Send</button>
        </Form>
      </Panel>
    );
  }
}
