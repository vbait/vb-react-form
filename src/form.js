import React from 'react';
import map from 'lodash/map';
import keyBy from 'lodash/keyBy';
import forEach from 'lodash/forEach';
import { getElementProps } from './utils';

// https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.fields = {};
    this.errors = [];
    this.initialized = false;
  }

  getChildContext() {
    console.log('getChildContext');
    const {
      validators = {},
      validatorsOptions = {},
      asyncValidator = {},
      asyncValidatorOptions = {},
      errors = {},
    } = this.props;
    const validateForm = validators[''];
    let validatorsErrors = {};
    if (validateForm && Object.keys(this.fields).length) {
      validatorsErrors = validateForm(this.getFieldsOptions()) || {};
    }
    this.errors = [];
    if (errors['']) {
      this.errors.push(errors['']);
    }
    if (validatorsErrors['']) {
      this.errors.push(validatorsErrors['']);
    }

    return {
      form: {
        onInitField: this.onInitField,
        onFocusField: this.updateField,
        onBlurField: this.updateField,
        onChangeField: this.updateField,
        onUpdateField: this.updateField,
        onAsyncValid: this.updateField,
        onRemoveField: this.onRemoveField,
        getFieldByName: this.getFieldByName,
        validators: validators,
        validatorsOptions: validatorsOptions,
        asyncValidator: asyncValidator,
        asyncValidatorOptions: asyncValidatorOptions,
        errors: errors,
        validatorsErrors: validatorsErrors,
      },
    };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentDidUpdate() {
    if (!this.initialized) {
      this.initialized = true;
      this.returnFormState();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {onSubmit = () => {}} = this.props;
    const fields = this.fields;
    let isValid = true;
    const values = Object.keys(fields).reduce((temp, key) => {
      fields[key].instance.validate();
      if (fields[key].errors.length) {
        isValid = false;
      } if (fields[key].pending || fields[key].asyncErrors.length) {
        isValid = false;
      } else {
        temp[key] = fields[key].value;
      }
      return temp;
    }, {});
    if (isValid) {
      onSubmit(values);
    }
  };

  onInitField = (field) => {
    this.fields[field.name] = field;
    if (this.initialized) {
      this.initialized = false;
      this.forceUpdate();
    }
  };

  onRemoveField = (field) => {
    this.removeField(field);
  };

  updateField = (field) => {
    this.fields[field.name] = field;
    this.initialized = false;
    this.forceUpdate();
  };

  returnFormState() {
    const {onValid} = this.props;
    if (onValid) {
      onValid(this.getFormOptions(), this.getFieldsOptions());
    }
  }

  removeField = (field) => {
    delete this.fields[field.name];
  };

  getFieldByName = (name) => {
    return this.fields[name];
  };

  reset = (value = {}) => {
    this.initialized = false;
    forEach(this.fields, (field, key) => {
      field.instance.reset(value[key]);
    });
    setTimeout(() => {
      this.forceUpdate();
    });
  };

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
  onValid: React.PropTypes.any,
};
Form.childContextTypes = {
  form: React.PropTypes.any,
};

const formConnector = (component) => {
  return ((c) => {
    class WrapperComponent extends React.Component {
      render() {
        return React.createElement(c, {...this.props, ...this.context})
      }
    }
    WrapperComponent.contextTypes = {
      form: React.PropTypes.object.isRequired,
    };
    return WrapperComponent;
  })(component);
};

export {Form, formConnector};
