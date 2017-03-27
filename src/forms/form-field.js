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
  };

  onFocus = (field) => {
    console.log('onFocus', field);
    const form = this.getForm();
    form.onFocusField(field);
  };

  onBlur = (field) => {
    console.log('onBlur', field);
    const form = this.getForm();
    form.onBlurField(field);
  };

  onChange = (field) => {
    console.log('onChange', field);
    const form = this.getForm();
    form.onChangeField(field);
  };

  onUpdate = (field) => {
    console.log('onUpdate', field);
    const form = this.getForm();
    form.onUpdateField(field);
  };

  onRemove = (field) => {
    console.log('onRemove', field);
    const form = this.getForm();
    form.onRemoveField(field);
  };

  getForm() {
    return this.context.form;
  };

  render() {
    return (
      <Field
        {...this.props}
        onInit={this.onInit}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onUpdate={this.onUpdate}
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