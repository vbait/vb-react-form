import React from 'react';
import { Validator } from './validators';
import { getElementProps } from './utils';
import { FieldInput, FieldRadio, FieldCheckbox, FieldRadioGroup } from './fields';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

export class FieldAttr {
  static events = {
    FOCUS: 'focus',
    CHANGE: 'change',
    BLUR: 'blur',
  };
  instance;
  name = '';
  value = '';
  validators = [];
  validatorsOptions = {};
  asyncValidator = null;
  asyncValidatorOptions = {};
  errors = [];
  asyncErrors = [];
  touched = false;
  dirty = false;
  pristine = true;
  focused = false;
  pending = false;

  constructor(
    instance, name = '', value = '',
    validators = [], validatorsOptions = {},
    asyncValidator = null, asyncValidatorOptions = {})
  {
    this.instance = instance;
    this.name = name;
    this.value = value;
    this.validators = validators;
    this.validatorsOptions = validatorsOptions;
    this.asyncValidator = asyncValidator;
    this.asyncValidatorOptions = asyncValidatorOptions;
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

  setAsyncValidatorOptions(options = {}) {
    this.asyncValidatorOptions = options;
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

  validate() {
    const {validators, name, value} = this;
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
  }

  asyncValidate(currentEvent, done) {
    if (currentEvent && currentEvent === FieldAttr.events.CHANGE) {
      this.asyncErrors = [];
    }
    const {value, asyncValidator, asyncValidatorOptions, errors} = this;
    const {validateOn = [], validateAfterLocal = false} = asyncValidatorOptions;
    if (validateAfterLocal && errors.length) {
      return done();
    }
    if (asyncValidator) {
      if (validateOn.length && validateOn.indexOf(currentEvent) === -1) {
        return done();
      }
      this.pending = true;
      asyncValidator.isValid(value)
        .then(() => {
          this.pending = false;
          this.asyncErrors = [];
          done(true);
        })
        .catch((errors) => {
          this.pending = false;
          this.asyncErrors = errors || [];
          done(true);
        });
    } else {
      done();
    }
  }

  getFieldOptions() {
    return cloneDeep({
      name: this.name,
      focused: this.focused,
      touched: this.touched,
      dirty: this.dirty,
      pristine: this.pristine,
      value: this.value,
      pending: this.pending,
      errors: this.errors,
      asyncErrors: this.asyncErrors,
    });
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

  componentDidMount() {
    const {onInit = () => {}} = this.props;
    onInit(this.field);
  }

  componentWillReceiveProps(nextProps) {
    let changed = false;
    let validate = false;
    if (this.props.value !== nextProps.value) {
      this.field.setValue(nextProps.value);
      this.updateState();
      changed = true;
    }
    if (!isEqual(this.props.validators, nextProps.validators)) {
      this.field.setValidators(nextProps.validators);
      this.field.setValidatorsOptions(nextProps.validatorsOptions);
      changed = true;
      validate = true;
    }
    if (!isEqual(this.props.asyncValidator, nextProps.asyncValidator)) {
      this.field.setAsyncValidator(nextProps.asyncValidator);
      this.field.setAsyncValidatorOptions(nextProps.asyncValidatorOptions);
      changed = true;
      validate = true;
    }
    if (validate) {
      this.validateField();
    }
    if (changed) {
      const {onUpdate = () => {}} = nextProps;
      onUpdate(this.field);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState) || !isEqual(this.context, nextContext);
  }

  componentWillUnmount() {
    const {onRemove = () => {}} = this.props;
    onRemove(this.field);
  }

  createField(props = {}) {
    const {
      name, value = '',
      validators = [], validatorsOptions = {},
      asyncValidator = null, asyncValidatorOptions = {},
    } = this.props;
    const val = props.value !== undefined ? props.value : value; // For reset values
    return new FieldAttr(
      this, name, val,
      validators, validatorsOptions,
      asyncValidator, asyncValidatorOptions
    );
  }

  validateField(event) {
    const {onAsyncValid = () => {}} = this.props;
    this.field.validate();
    this.field.asyncValidate(event, (active) => {
      active && onAsyncValid(this.field);
    });
  }

  onFocus = (event) => {
    const {onFocus = () => {}} = this.props;
    this.field.setFocus(true);
    this.validateField(FieldAttr.events.FOCUS);
    onFocus(this.field, event);
  };

  onBlur = (event) => {
    const {onBlur = () => {}} = this.props;
    this.field.setFocus(false);
    this.field.setTouched(true);
    this.validateField(FieldAttr.events.BLUR);
    onBlur(this.field, event);
  };

  onChange = (value, event) => {
    const {onChange = () => {}} = this.props;
    this.field.setValue(value);
    this.field.setTouched(true);
    this.field.setDirty(true);
    this.validateField(FieldAttr.events.CHANGE);
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
    return new Promise((resolve) => {
      const {onInit = () => {}} = this.props;
      this.field = this.createField({value});
      this.setState({
        value: this.field.value
      }, () => {
        this.validateField();
        onInit(this.field);
        resolve(this.field);
      });
    });
  };

  updateState = () => {
    this.setState({value: this.field.value});
  };

  render() {
    // console.log(111111, this.props.name);
    let defaultComponent = FieldInput;
    const {component, type} = this.props;
    const {value} = this.state;
    switch (type) {
      case 'checkbox':
        defaultComponent = FieldCheckbox;
        break;
      case 'radio':
        defaultComponent = FieldRadio;
        break;
    }
    return React.createElement(component || defaultComponent, {
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
  onChange: React.PropTypes.func,
  onInit: React.PropTypes.func,
  onUpdate: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  value: React.PropTypes.any,
  options: React.PropTypes.arrayOf(React.PropTypes.any),
  validators: React.PropTypes.arrayOf(React.PropTypes.shape({
    isValid: React.PropTypes.func.isRequired,
    error: React.PropTypes.func.isRequired,
  })),
  validatorsOptions: React.PropTypes.shape({
    multi: React.PropTypes.bool,
    validateAfterLocal: React.PropTypes.bool,
  }),
  asyncValidator: React.PropTypes.object,
  asyncValidatorOptions: React.PropTypes.shape({
    validateOn: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
};

Field.Input = FieldInput;
Field.Radio = FieldRadio;
Field.Checkbox = FieldCheckbox;
Field.RadioGroup = FieldRadioGroup;

export {Field}