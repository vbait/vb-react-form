import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import { VBForm, connectForm } from '../../../src/Forms';

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

class FormFieldWrapper extends React.Component {
  state = {
    invalid: false,
  };

  onFieldChange = (model) => {
    this.setState(() => ({
      invalid: model.touched && !model.isValid(),
      errors: model.errors(),
    }));
  };

  render() {
    const { id, label } = this.props;
    const { invalid, errors } = this.state;
    return (
      <FormGroup controlId={id} validationState={invalid ? 'error' : null}>
        {label && <ControlLabel>{label}</ControlLabel>}
        <VBForm.Field {...this.props} onFieldChange={this.onFieldChange} />
        {invalid && (
          <HelpBlock>
            {errors.map(error => (
              <div key={error}>{error}</div>
            ))}
          </HelpBlock>
        )}
      </FormGroup>
    )
  }
}

const PasswordField = ({ model, ...props }) => {
  const invalid = model.touched && !model.isValid();
  const errors = model.errors();
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

const RBField = ({ model, ...props }) => {
  const invalid = model.touched && !model.isValid();
  const errors = model.errors();
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
    const { value, ...other } = this.props;
    return (
      <FormControl value={value || ''} {...other} onChange={this.onChange} />
    )
  }
}

const ErrorComponent = ({ form, field }) => {
  let errors = [];
  let invalid = false;
  if (field) {
    errors = field.errors();
    invalid = field.touched && !field.isValid();
  } else {
    errors = form.errors().form;
    invalid = form.isTouched() && errors.length;
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
  FormFieldWrapper,
  PasswordField,
  InputField,
  ErrorComponent,
  RBField,
};
