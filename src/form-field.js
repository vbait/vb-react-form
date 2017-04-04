import React from 'react';
import { Field } from './field';
import { Validator } from './validators';
import { FormContext } from './form-context';

class InvalidValidator extends Validator {
  isValid() {
    return false;
  }
}

class FormField extends React.Component {
  subscriberId;
  formError = false;
  constructor(props, context) {
    super(props, context);
    this.removed = false;
    this.state = {errorValidators: []};
  }

  componentDidMount() {
    this.subscriberId = this.context.form.validators.subscribe((error) => {
      if (this.formError !== error) {
        this.formError = error;
        this.onValid(this.context.form.fields.getFieldByName(this.props.name));
      }
    }, this.props.name);
  }

  componentWillUnmount() {
    this.context.form.validators.removeSubscriber(this.subscriberId);
    this.subscriberId = null;
  }

  onInit = (field) => {
    // console.log('onInit', field);
    this.context.form.onInitField(field);
    this.onValid(field);
  };

  onFocus = (field, e) => {
    // console.log('onFocus', field);
    this.context.form.onUpdateField(field);
    const {onFocus = () => {}} = this.props;
    onFocus(e, field);
    this.onValid(field);
  };

  onBlur = (field, e) => {
    // console.log('onBlur', field);
    this.context.form.onUpdateField(field);
    const {onBlur = () => {}} = this.props;
    onBlur(e, field);
    this.onValid(field);
  };

  onChange = (field, e) => {
    // console.log('onChange', field);
    this.context.form.onUpdateField(field);
    const {onChange = () => {}} = this.props;
    onChange(e, field);
    this.onValid(field);
  };

  onUpdate = (field) => {
    // console.log('onUpdate', field);
    this.context.form.onUpdateField(field);
    this.onValid(field);
  };

  onAsyncValid = (field) => {
    // console.log('onAsyncValid', field);
    if (!this.removed) {
      this.context.form.onUpdateField(field);
      this.onValid(field);
    }
  };

  onRemove = (field) => {
    // console.log('onRemove', field);
    this.removed = true;
    this.context.form.onRemoveField(field);
  };

  onValid(field) {
    const {onValid = () => {}} = this.props;
    onValid(field, this.formError);
  }

  render() {
    const {
      formValidators,
      formValidatorsOptions,
      formAsyncValidator,
      formAsyncValidatorOptions,
    } = this.context.form;
    const {
      name,
      validators = [],
      validatorsOptions = {},
      asyncValidator,
      asyncValidatorOptions = {},
      ...other,
    } = this.props;
    // console.log(validators);
    return (
      <Field
        {...other}
        name={name}
        validators={[...validators, ...formValidators[name] || [], ...this.state.errorValidators]}
        validatorsOptions={{...formValidatorsOptions, ...validatorsOptions}}
        asyncValidator={asyncValidator || formAsyncValidator[name]}
        asyncValidatorOptions={{...formAsyncValidatorOptions, ...asyncValidatorOptions}}
        onInit={this.onInit}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onUpdate={this.onUpdate}
        onAsyncValid={this.onAsyncValid}
        onRemove={this.onRemove}
      />
    )
  };
}

FormField.propTypes = {
  name: React.PropTypes.string.isRequired,
};

FormField.contextTypes = {
  form: React.PropTypes.instanceOf(FormContext).isRequired,
};

export {FormField};