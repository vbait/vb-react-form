import React from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './form-context';

class FormFieldErrorsComponent extends React.Component {
  render() {
    const {field, formError, ...other} = this.props;
    return (field.dirty ? <div {...other}>
      {field.errors.map((error, index) => <div key={index}>{error}</div>)}
      {field.asyncErrors.map((error, index) => <div key={index}>{error}</div>)}
      {formError}
    </div> : null)
  };
}

class FormFieldErrors extends React.Component {
  fieldSubscriberId;
  formFieldSubscriberId;
  formError = false;
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.fieldSubscriberId = this.context.form.fields.subscribe(() => {
      this.forceUpdate();
    }, this.props.name);
    this.formFieldSubscriberId = this.context.form.validators.subscribe((error) => {
      if (this.formError !== error) {
        this.formError = error;
        this.forceUpdate();
      }
    }, this.props.name);
  }

  componentWillUnmount() {
    this.context.form.fields.removeSubscriber(this.fieldSubscriberId);
    this.context.form.validators.removeSubscriber(this.formFieldSubscriberId);
    this.fieldSubscriberId = null;
    this.formFieldSubscriberId = null;
  }

  render() {
    const {name, component, ...other} = this.props;
    const field = this.context.form.fields.getFieldOptions(name);
    const element = React.createElement(component || FormFieldErrorsComponent, {
      field: field,
      formError: this.formError,
      ...other,
    });
    return (field ? element : null)
  };
}

FormFieldErrors.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.func,
};

FormFieldErrors.contextTypes = {
  form: PropTypes.instanceOf(FormContext).isRequired,
};

export {FormFieldErrors};