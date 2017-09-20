import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { VBForm, requiredValidator, passwordValidator } from '../../../src/FormsV1';
import { FormActions, FormFieldWrapper, InputField, PasswordField, ErrorComponent } from './Fields';

const formValidator = (fields, data) => {
  const errors = {};
  let invalid = false;
  if (data.firstName === 'Vitalii') {
    invalid = true;
    errors.firstName = ['This value is not valid.'];
  }
  if (data.password1 !== data.password2) {
    invalid = true;
    errors.password2 = ['Passwords are not equal.'];
  }
  if (invalid) {
    errors[''] = 'Form is not valid.';
  }
  errors['profile'] = { city: ['City error'] };
  return errors;
};

const profileValidator = () => {
  return {
    city: ['Error'],
  }
};

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.validators = {
      firstName: (name, value) => {
        return requiredValidator(value);
      },
      required: (name, value) => {
        return requiredValidator(value);
      },
      password: (name, value) => {
        return passwordValidator(value);
      }
    };

    this.state = {
      user: {
        firstName: 'Vitalii',
        profile: {},
      }
    };
  }

  onLoad = (model) => {
    this.form = model;
  };

  onSubmit = (values) => {
    console.log(1111111, values);
  };

  onChange = (model) => {
    console.log(999999);
    const firstName = model.fields.field('firstName');
    const firstNameUppercase = model.fields.field('firstNameUppercase');
    const firstNameLowercase = model.fields.field('firstNameLowercase');
    firstNameUppercase.setValue(firstName.value.toUpperCase());
    firstNameUppercase.reload();
    firstNameLowercase.setValue(firstName.value.toLowerCase());
    firstNameLowercase.reload();
  };

  reset = () => {
    this.form.reset();
  };

  init = () => {
    this.form.init({
      firstName: 'V',
      profile: {
        city: 'Chernivtsi',
      }
    });
  };

  initAndDirty = () => {
    this.form.init({
      firstName: 'Vitalii1',
      password1: 'aaaAAA111!',
      password2: 'aaaAAA111!',
      profile: {
        city: 'Chernivtsi',
        address: 'Chernivtsi',
      },
    }, true);
  };

  dirty = () => {
    this.form.makeDirty();
  };

  render() {
    const { user } = this.state;
    return (
      <Row>
        <Col xs={12}>
          <h3 className="page-header">Form V1</h3>
          <VBForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            onLoad={this.onLoad}
            validator={formValidator}
          >
            <VBForm.Errors component={ErrorComponent} />
            <FormFieldWrapper
              name="firstName"
              value={user.firstName}
              label="First Name"
              component={InputField}
              validator={this.validators.firstName}
            />
            <VBForm.Errors name="firstName" component={ErrorComponent} />
            <VBForm.Field
              name="firstNameUppercase"
              label="First Name Uppercase"
              component={InputField}
              placeholder="First Name Uppercase"
              readOnly
              excluded
            />
            <VBForm.Field
              name="firstNameLowercase"
              component={InputField}
              placeholder="First Name Lowercase"
              disabled
              excluded
            />
            <hr />
            <h4>Profile</h4>
            <VBForm.Item name="profile" validator={profileValidator}>
              <VBForm.Field
                name="city"
                value={user.profile.city}
                label="City"
                component={PasswordField}
                validator={this.validators.required}
                includeModel
              />
              <VBForm.Field
                name="address"
                value={user.profile.address}
                label="Address"
                component={PasswordField}
                validator={this.validators.required}
                includeModel
              />
            </VBForm.Item>
            <hr />
            <h4>Password</h4>
            <FormFieldWrapper
              name="password1"
              type="password"
              value={user.password1}
              label="Password"
              component={InputField}
              validator={this.validators.password}
            />
            <VBForm.Field
              name="password2"
              type="password"
              value={user.password2}
              label="Repeat Password"
              component={PasswordField}
              validator={this.validators.password}
              includeModel
            />
            <FormActions />
            <Button type="submit">Submit</Button>
          </VBForm>
          <br />
        </Col>
        <Col xs={12}>
          <Button onClick={this.reset}>Reset</Button>&nbsp;
          <Button onClick={this.init}>Init</Button>&nbsp;
          <Button onClick={this.initAndDirty}>Init and Dirty</Button>&nbsp;
          <Button onClick={this.dirty}>Dirty</Button>
        </Col>
      </Row>
    );
  }
}

export default Form;
