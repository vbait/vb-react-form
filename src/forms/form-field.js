import React from 'react';
import { Field } from './field';

class FormField extends React.Component {

  constructor(props) {
    super(props);
  }

  onInit = (field) => {
    console.log('onInit', field);
    const form = this.getForm();
    form.onInitField(field);
    this.onValid(field);
  };

  onFocus = (field, e) => {
    console.log('onFocus', field);
    const form = this.getForm();
    const {onFocus = () => {}} = this.props;
    form.onFocusField(field);
    onFocus(e, field);
    this.onValid(field);
  };

  onBlur = (field, e) => {
    console.log('onBlur', field);
    const form = this.getForm();
    form.onBlurField(field);
    const {onBlur = () => {}} = this.props;
    onBlur(e, field);
    this.onValid(field);
  };

  onChange = (field, e) => {
    console.log('onChange', field);
    const form = this.getForm();
    form.onChangeField(field);
    const {onChange = () => {}} = this.props;
    onChange(e, field);
    this.onValid(field);
  };

  onUpdate = (field) => {
    console.log('onUpdate', field);
    const form = this.getForm();
    form.onUpdateField(field);
    this.onValid(field);
  };

  onAsyncValid = (field) => {
    console.log('onAsyncValid', field);
    const form = this.getForm();
    form.onAsyncValid(field);
    this.onValid(field);
  };

  onRemove = (field) => {
    console.log('onRemove', field);
    const form = this.getForm();
    form.onRemoveField(field);
  };

  getForm() {
    return this.context.form;
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
        ref={(field) => this.field = field}
      />
    )
  };
}

FormField.propTypes = {};

FormField.contextTypes = {
  form: React.PropTypes.object.isRequired,
};

export {FormField};