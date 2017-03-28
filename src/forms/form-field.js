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

  onFocus = (field, e) => {
    console.log('onFocus', field);
    const form = this.getForm();
    const {onFocus = () => {}} = this.props;
    form.onFocusField(field);
    onFocus(e, field);
  };

  onBlur = (field, e) => {
    console.log('onBlur', field);
    const form = this.getForm();
    const {onBlur = () => {}} = this.props;
    form.onBlurField(field);
    onBlur(e, field);
  };

  onChange = (field, e) => {
    console.log('onChange', field);
    const form = this.getForm();
    const {onChange = () => {}} = this.props;
    form.onChangeField(field);
    onChange(e, field);
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

  getFieldAttr = () => {
    return this.field && this.field.field;
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