import React from 'react';
import map from 'lodash/map';
import keyBy from 'lodash/keyBy';
import forEach from 'lodash/forEach';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { getElementProps } from './utils';

// https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076

export class FormContext {
  constructor() {
    this.initialized = false;
    this.subscribers = {};
    this.subscribersToValidators = {};
    this.fields = {};
    this.errors = [];
    this.formValidators = {};
    this.formValidatorsOptions = {};
    this.formAsyncValidator = {};
    this.formAsyncValidatorOptions = {};
  }

  subscribe(f) {
    this.subscribeByName(f, '');
  }

  subscribeByName(f, name) {
    if (this.subscribers[name]) {
      this.subscribers[name].push(f);
    } else {
      this.subscribers[name] = [f];
    }
    if (this.fields[name]) {
      f(this.fields[name].getFieldOptions());
    }
  }

  publishByName(name) {
    if (this.subscribers[name]) {
      this.subscribers[name].forEach(f => {
        if (name) {
          f(this.fields[name].getFieldOptions());
        } else {
          f(this.getFieldsOptions());
        }
      });
    }
  }

  subscribeToValidators(f) {
    this.subscribeToValidatorsByName(f, '__all__');
  }

  subscribeToValidatorsByName(f, name) {
    if (this.subscribersToValidators[name]) {
      this.subscribersToValidators[name].push(f);
    } else {
      this.subscribersToValidators[name] = [f];
    }
  }

  publishValidators() {
    const validators = this.formValidators[''];
    if (validators) {
      const errors = {};
      forEach(validators, (validator, name) => {
        const error = validator(this.getFieldsOptions());
        if (error) {
          errors[name] = error;
        }

        if (name !== '__all__') {
          const subscribers = this.subscribersToValidators[name] || [];
          subscribers.forEach((f) => {
            f(errors[name]);
          });
        }
      });

      const subscribers = this.subscribersToValidators['__all__'] || [];
      subscribers.forEach((f) => {
        f(errors);
      });
    }
  }

  update() {
    this.publishValidators();
  }

  onInitField(field) {
    console.log('onInitField', field);
    this.fields[field.name] = field;
    this.publishByName(field.name);
    this.publishByName('');
    if (this.initialized) {
      this.update();
    }
  }

  onUpdateField(field) {
    console.log('onUpdateField', field);
    this.fields[field.name] = field;
    this.publishByName(field.name);
    this.publishByName('');
    this.update();
  }

  onRemoveField(field) {
    console.log('onRemoveField', field);
    if (this.subscribers[field.name]) {
      delete this.subscribers[field.name];
    }
    if (this.subscribersToValidators[field.name]) {
      delete this.subscribersToValidators[field.name];
    }
    delete this.fields[field.name];
  }

  setValidators(validators = {}) {
    this.formValidators = validators;
  }

  setValidatorsOptions(options = {}) {
    this.formValidatorsOptions = options;
  }

  setAsyncValidator(validators = {}) {
    this.formAsyncValidator = validators;
  }

  setAsyncValidatorOptions(options = {}) {
    this.formAsyncValidatorOptions = options;
  }

  getFormOptions = () => {
    const props = {
      pending: false,
      dirty: false,
      isValid: true,
      errors: [...this.errors],
    };
    forEach(this.fields, (field) => {
      if (field.dirty) {
        props.dirty = true;
      }
      if (field.pending) {
        props.pending = true;
      }
      if (field.errors.length || field.asyncErrors.length) {
        props.isValid = false;
      }
    });
    if (this.errors.length) {
      props.isValid = false;
    }
    return props;
  };

  getFieldsOptions = () => {
    return keyBy(map(this.fields, (field) => {
      return field.getFieldOptions();
    }), 'name');
  };

  getFieldByName = (name) => {
    if (this.fields[name]) {
      return this.fields[name].getFieldOptions();
    }
  }
}

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
    // console.log('componentWillReceiveProps', nextProps.validators);
    this.formContext.setValidators(nextProps.validators);
    this.formContext.setValidatorsOptions(nextProps.validatorsOptions);
    this.formContext.setAsyncValidator(nextProps.asyncValidator);
    this.formContext.setAsyncValidatorOptions(nextProps.asyncValidatorOptions);
    this.formContext.update();
  }

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const {children} = this.props;
    return (
      <form {...getElementProps(this.props)} onSubmit={this.onSubmit} noValidate>{children}</form>
    );
  }
}
Form.propTypes = {
  name: React.PropTypes.any,
  children: React.PropTypes.any,
  onSubmit: React.PropTypes.any,
};
Form.childContextTypes = {
  form: React.PropTypes.instanceOf(FormContext),
};

const formConnector = (component) => {
  return ((c) => {
    class WrapperComponent extends React.Component {
      render() {
        return React.createElement(c, {...this.props, ...this.context})
      }
    }
    WrapperComponent.contextTypes = {
      form: React.PropTypes.instanceOf(FormContext).isRequired,
    };
    return WrapperComponent;
  })(component);
};

export {Form, formConnector};
