import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { VBForm } from '../../../src/FormsV1';

const Actions = ({ model }) => {
  const isValid = model.isValid();
  return (
    <Button type="submit" bsStyle="success" disabled={!isValid}>
      {isValid ? 'Submit' : 'Not Valid'}
    </Button>
  )
};
Actions.propTypes = {
  model: PropTypes.object.isRequired,
};

class FormFieldWrapper extends React.Component {
  state = {
    invalid: false,
  };

  onFieldChange = (model) => {
    this.setState(() => ({
      invalid: model.touched && !model.isValid(),
      errors: model.getErrors(),
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

export {
  Actions,
  FormFieldWrapper,
  PasswordField,
  InputField,
};
