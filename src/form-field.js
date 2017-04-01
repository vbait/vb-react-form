import React from 'react';
import { Field } from './field';
import { Validator } from './validators';

class InvalidValidator extends Validator {
  isValid() {
    return false;
  }
}

class FormField extends React.Component {

  constructor(props) {
    super(props);
  }

  onInit = (field) => {
    console.log('onInit', field);
    this.onValid(field);
  };

  onFocus = (field, e) => {
    console.log('onFocus', field);
    const {onFocus = () => {}} = this.props;
    onFocus(e, field);
    this.onValid(field);
  };

  onBlur = (field, e) => {
    console.log('onBlur', field);
    const {onBlur = () => {}} = this.props;
    onBlur(e, field);
    this.onValid(field);
  };

  onChange = (field, e) => {
    console.log('onChange', field);
    const {onChange = () => {}} = this.props;
    onChange(e, field);
    this.onValid(field);
  };

  onUpdate = (field) => {
    console.log('onUpdate', field);
    this.onValid(field);
  };

  onAsyncValid = (field) => {
    console.log('onAsyncValid', field);
    this.onValid(field);
  };

  onRemove = (field) => {
    console.log('onRemove', field);
  };

  onValid(field) {
    const {onValid = () => {}} = this.props;
    onValid(field);
  }

  render() {
    return (
      <Field
        {...this.props}
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

FormField.propTypes = {};

FormField.contextTypes = {
  form: React.PropTypes.object.isRequired,
};

export {FormField};