import React from 'react';
import PropTypes from 'prop-types';
import { getElementProps } from './utils';
import { FieldInput, FieldText, FieldRadio, FieldCheckbox, FieldSelect, FieldRadioGroup, FieldCheckboxGroup } from './fields';
import { FieldProps } from './field-props';
import { FieldAttr } from './field-attr';
import { isEqual } from 'lodash';

class Field extends React.Component {
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
      validate = true;
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

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
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
  ...FieldProps,
  onInit: PropTypes.func,
  onUpdate: PropTypes.func,
  onAsyncValid: PropTypes.func,
};

Field.Input = FieldInput;
Field.Radio = FieldRadio;
Field.Checkbox = FieldCheckbox;
Field.RadioGroup = FieldRadioGroup;
Field.CheckboxGroup = FieldCheckboxGroup;
Field.Select = FieldSelect;
Field.Text = FieldText;

export {Field}