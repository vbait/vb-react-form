import React from 'react';
import PropTypes from 'prop-types';
import { forEach } from 'lodash';
import { getElementProps } from './utils';
import { FormContext } from './form-context';

class Form extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.formContext = new FormContext();
    this.formContext.setValidators(props.validators);
    this.formContext.setValidatorsOptions(props.validatorsOptions);
    this.formContext.setAsyncValidator(props.asyncValidator);
    this.formContext.setAsyncValidatorOptions(props.asyncValidatorOptions);
  }

  getChildContext() {
    return {form: this.formContext};
  }

  componentDidMount() {
    this.formContext.initialized = true;
    this.formContext.update();
  }

  componentWillReceiveProps(nextProps) {
    this.formContext.setValidators(nextProps.validators);
    this.formContext.setValidatorsOptions(nextProps.validatorsOptions);
    this.formContext.setAsyncValidator(nextProps.asyncValidator);
    this.formContext.setAsyncValidatorOptions(nextProps.asyncValidatorOptions);
    this.formContext.update();
  }

  componentWillUnmount() {
    this.formContext.clear();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const isFormContextValid = this.formContext.isValid();
    if (isFormContextValid) {
      const {onSubmit = () => {}} = this.props;
      onSubmit(this.formContext.fields.getValues());
    } else {
      this.formContext.fields.updateFieldsAsUsed();
    }
  };

  reset(value = {}) {
    this.formContext.reset(value);
  }

  render() {
    const {children} = this.props;
    return (
      <form {...getElementProps(this.props)} onSubmit={this.onSubmit} noValidate>{children}</form>
    );
  }
}
Form.propTypes = {
  name: PropTypes.any,
  children: PropTypes.any,
  onSubmit: PropTypes.any,
};
Form.childContextTypes = {
  form: PropTypes.instanceOf(FormContext).isRequired,
};

const formConnector = (component) => {
  return ((c) => {
    class WrapperComponent extends React.Component {
      fieldsSubscriberId;
      validatorsSubscriberId;
      componentDidMount() {
        this.fieldsSubscriberId = this.context.form.fields.subscribe(() => {
          this.forceUpdate();
        });
        this.validatorsSubscriberId = this.context.form.validators.subscribe(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        this.context.form.fields.removeSubscriber(this.fieldsSubscriberId);
        this.context.form.validators.removeSubscriber(this.validatorsSubscriberId);
        this.fieldsSubscriberId = null;
        this.validatorsSubscriberId = null;
      }

      render() {
        const form = this.context.form;
        const props = {
          dirty: false,
          pristine: true,
          touched: false,
          isValid: form.isValid(),
          fields: form.fields.getFieldsOptions(),
          formErrors: form.validators.errors,
          fieldsErrors: form.fields.getErrors(),
        };
        forEach(form.fields.getFieldsOptions(), (field) => {
          if (field.dirty) {
            props.dirty = true;
            props.pristine = false;
          }
          if (field.touched) {
            props.touched = true;
          }
        });
        return React.createElement(c, {...this.props, form: props});
      }
    }
    WrapperComponent.contextTypes = {
      form: PropTypes.instanceOf(FormContext).isRequired,
    };
    return WrapperComponent;
  })(component);
};

export {Form, formConnector};
