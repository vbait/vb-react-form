import React from 'react';
import { Field } from './fields';

class ModelField extends React.Component {

  constructor(props) {
    super(props);
  }

  onInit = (field) => {
    const form = this.getForm();
    console.log('onInit', field);
    form.onInitField(field);
  };

  onFocus = (field) => {
    console.log('onFocus', field);
  };

  onBlur = (field) => {
    console.log('onBlur', field);
  };

  onChange = (field) => {
    console.log('onChange', field);
  };

  onUpdate = (field) => {
    console.log('onUpdate', field);
  };

  onRemove = (field) => {
    console.log('onRemove', field);
  };

  getForm() {
    const {form} = this.context;
    return form;
  };

  render() {
    const {form, ...other} = this.props;
    return (
      <Field
        {...other}
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

ModelField.propTypes = {};

ModelField.contextTypes = {
  form: React.PropTypes.any.isRequired,
};

export {ModelField}