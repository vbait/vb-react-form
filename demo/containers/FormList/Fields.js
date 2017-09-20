import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import { connectForm } from '../../../src/FormsV1';

const Actions = ({ form }) => {
  const isValid = form.isValid();
  return (
    <Button type="submit" bsStyle="success" disabled={!isValid}>
      {isValid ? 'Submit' : 'Not Valid'}
    </Button>
  )
};
Actions.propTypes = {
  form: PropTypes.object.isRequired,
};

const FormActions = connectForm(Actions);

const RBField = ({ model, ...props }) => {
  const invalid = model.touched && !model.isValid();
  const errors = model.getErrors();
  return (
    <FormGroup controlId={props.id} validationState={invalid ? 'error' : null}>
      {props.label && <ControlLabel>{props.label}</ControlLabel>}
      <InputField {...props} />
      {invalid && (
        <HelpBlock>
          {errors.map(error => (
            <div key={error}>{error}</div>
          ))}
        </HelpBlock>
      )}
    </FormGroup>
  );
};

class InputField extends React.PureComponent {
  onChange = (event) => {
    event.preventDefault();
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <FormControl {...this.props} onChange={this.onChange} />
    )
  }
}

const ErrorComponent = ({ form, field }) => {
  let errors = [];
  let invalid = false;
  if (field) {
    errors = field.getErrors();
    invalid = field.touched && !field.isValid();
  } else {
    errors = form.errors;
    invalid = form.isTouched() && form.errors.length;
  }
  return (
    <div>
      {invalid ? (
        <Alert bsStyle="danger">
          {errors.map(error => (
            <div key={error}>{error}</div>
          ))}
        </Alert>
      ) : null}
    </div>
  )
};

export {
  FormActions,
  InputField,
  ErrorComponent,
  RBField,
};
