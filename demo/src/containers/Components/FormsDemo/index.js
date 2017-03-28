import React from 'react';
import { Panel, FormGroup, ControlLabel, FormControl, HelpBlock, Overlay, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { Field, FormField, RequiredValidator, Form, FormFieldValidator } from '../../../../../src/forms';

const FieldGroup = ({ id, label, help, ...props }) => {
  const popoverFocus = (<Popover id="popover-trigger-focus">{help}</Popover>);

  let validationState = null;
  if (this.field) {
    const fieldAttr = this.field.getFieldAttr();
    if (fieldAttr.dirty && fieldAttr.errors.length) {
      validationState = 'error';
    }
  }
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <OverlayTrigger trigger="focus" placement="left" overlay={popoverFocus}>
        <FormField className="form-control" {...props} ref={(field) => this.field = field} />
      </OverlayTrigger>
      <HelpBlock><FormFieldValidator name={props.name} /></HelpBlock>
    </FormGroup>
  );
};

export default class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
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
          <button className="btn" type="submit">Send</button>
        </Form>
      </Panel>
    );
  }
}
