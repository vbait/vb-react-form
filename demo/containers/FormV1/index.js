import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { VBForm, requiredValidator, passwordValidator } from '../../../src/FormsV1';

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
    console.log(model);
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

class InputField extends React.Component {
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

const formValidator = (fields, data) => {
  const errors = {};
  if (data.firstName === 'Vitalii') {
    errors.firstName = ['This value is not valid.'];
  }
  if (data.password1 !== data.password2) {
    errors.password2 = ['Passwords are not equal.'];
  }
  return errors;
};

class FormV1 extends React.Component {

  constructor(props) {
    super(props);
    this.validators = {
      firstName: (name, value) => {
        return requiredValidator(value);
      },
      password: (name, value) => {
        return passwordValidator(value);
      }
    };

    this.state = {
      user: {
        firstName: 'Vitalii',
      }
    };
  }

  onSubmit = () => {};

  render() {
    const { user } = this.state;
    return (
      <Row>
        <Col xs={12}>
          <h3 className="page-header">Form V1</h3>
          <VBForm onSubmit={this.onSubmit} validator={formValidator}>
            <FormFieldWrapper
              name="firstName"
              value={user.firstName}
              label="First Name"
              component={InputField}
              validator={this.validators.firstName}
              excluded
            />
            <FormFieldWrapper
              name="password1"
              type="password"
              value={user.password1}
              label="Password"
              component={InputField}
              validator={this.validators.password}
              excluded
            />
            <VBForm.Field
              name="password2"
              type="password"
              value={user.password2}
              label="Repeat Password"
              component={PasswordField}
              validator={this.validators.password}
              excluded
              includeModel
            />
          </VBForm>
        </Col>
      </Row>
    );
  }
}

export default FormV1;
