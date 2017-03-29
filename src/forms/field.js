import React from 'react';
import { Validator } from './validators';
import { getElementProps } from './utils';
import { FieldInput } from './fields';

export class FieldAttr {
  instance;
  name = '';
  value = '';
  validators = [];
  validatorsOptions = {};
  asyncValidator = null;
  errors = [];
  asyncErrors = [];
  touched = false;
  dirty = false;
  pristine = true;
  focused = false;
  pending = false;

  constructor(instance, name = '', value = '', validators = [], validatorsOptions = {}, asyncValidator = null) {
    this.instance = instance;
    this.name = name;
    this.value = value;
    this.validators = validators;
    this.validatorsOptions = validatorsOptions;
    this.asyncValidator = asyncValidator;
  }

  setValue(value = '') {
    this.value = value;
  }

  setValidators(validators = []) {
    this.validators = validators;
  }

  setValidatorsOptions(options = {}) {
    this.validatorsOptions = options;
  }

  setAsyncValidator(validator) {
    this.asyncValidator = validator;
  }

  setErrors(errors = []) {
    this.errors = errors;
  }

  setDirty(dirty) {
    this.dirty = !!dirty;
    this.pristine = !dirty;
  }

  setTouched(touched) {
    this.touched = !!touched;
  }

  setFocus(focused) {
    this.focused = focused;
  }

  validate(done, resetAsyncErrors = false) {
    const {validators, name, value, asyncValidator} = this;
    const {multi = true} = this.validatorsOptions;
    const errors = validators.map((v) => {
      return !v.isValid(value) && v.error(name, value);
    }).filter((v) => {
      return v;
    });
    if (multi && errors.length) {
      this.setErrors(errors);
    } else {
      this.setErrors(errors.slice(0, 1));
    }

    if (resetAsyncErrors) {
      this.asyncErrors = [];
    }
    if (asyncValidator && done) {
      this.pending = true;
      asyncValidator.isValid(value)
        .then(() => {
          this.pending = false;
          this.asyncErrors = [];
          done();
        })
        .catch((errors) => {
          this.pending = false;
          this.asyncErrors = errors || [];
          done();
        });
    }
  }
}

class Field extends React.PureComponent {
  field;

  constructor(props) {
    super(props);
    this.field = this.createField();
    this.validateField();
    this.state = {
      value: this.field.value,
    };
  }

  componentWillMount() {
    const {onInit = () => {}} = this.props;
    onInit(this.field);
  }

  componentWillReceiveProps(nextProps) {
    let changed = false;
    if (this.props.value !== nextProps.value) {
      this.field.setValue(nextProps.value);
      this.updateState();
      changed = true;
    }
    // if (this.props.validators !== nextProps.validators) {
    //   this.field.setValidators(nextProps.validators);
    //   this.field.setValidatorsOptions(nextProps.validatorsOptions);
    //   this.validateField();
    //   changed = true;
    // }
    if (this.props.asyncValidator !== nextProps.asyncValidator) {
      this.field.setAsyncValidator(nextProps.asyncValidator);
    }
    if (changed) {
      const {onUpdate = () => {}} = nextProps;
      onUpdate(this.field);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  componentWillUnmount() {
    const {onRemove = () => {}} = this.props;
    onRemove(this.field);
  }

  createField(props = {}) {
    const {
      name, value = '',
      validators = [], validatorsOptions = {},
      asyncValidator = null
    } = this.props;
    const val = props.value !== undefined ? props.value : value; // For reset values
    return new FieldAttr(
      this, name, val,
      validators, validatorsOptions,
      asyncValidator
    );
  }

  validateField(event) {
    const {asyncValidateOn, onAsyncValid = () => {}} = this.props;
    let done;
    if (asyncValidateOn) {
      if (asyncValidateOn.indexOf(event) !== -1) {
        done = () => onAsyncValid(this.field);
      }
    } else {
      done = () => onAsyncValid(this.field);
    }
    this.field.validate(done, event === 'change');
  }

  onFocus = (event) => {
    const {onFocus = () => {}} = this.props;
    this.field.setTouched(true);
    this.field.setFocus(true);
    this.validateField('focus');
    onFocus(this.field, event);
  };

  onBlur = (event) => {
    const {onBlur = () => {}} = this.props;
    this.field.setFocus(false);
    this.validateField('blur');
    onBlur(this.field, event);
  };

  onChange = (value, event) => {
    const {onChange = () => {}} = this.props;
    this.field.setValue(value);
    this.field.setDirty(true);
    this.validateField('change');
    this.updateState();
    onChange(this.field, event);
  };

  validate = () => {
    const {onUpdate = () => {}} = this.props;
    this.field.setDirty(true);
    this.validateField();
    onUpdate(this.field);
  };

  reset = (value) => {
    const {onInit = () => {}} = this.props;
    this.field = this.createField({value});
    this.setState({
      value: this.field.value
    }, () => {
      this.validateField();
      onInit(this.field);
    });
  };

  updateState = () => {
    this.setState({value: this.field.value});
  };

  render() {
    console.log(111111, this.props.name);
    const {component} = this.props;
    const {value} = this.state;
    return React.createElement(component || FieldInput, {
      ...getElementProps(this.props),
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      value: value,
    });
  };
}

Field.propTypes = {
  name: React.PropTypes.string.isRequired,
  component: React.PropTypes.func,
  validators: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Validator)),
  onChange: React.PropTypes.func,
  onInit: React.PropTypes.func,
  onUpdate: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  value: React.PropTypes.any,
  asyncValidateOn: React.PropTypes.arrayOf(React.PropTypes.string),
};

Field.Input = FieldInput;

export {Field}