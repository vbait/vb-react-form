import React from 'react';
import { Validator } from './validators';
import { getElementProps } from './utils';
import { FieldInput } from './fields';

export class FieldAttr {
  instance;
  name = '';
  value = '';
  validators = [];
  errors = [];
  touched = false;
  dirty = false;
  pristine = true;
  focused = false;

  constructor(instance, name = '', value = '', validators = []) {
    this.instance = instance;
    this.name = name;
    this.value = value;
    this.validators = validators;
  }

  setValue(value = '') {
    this.value = value;
  }

  setValidators(validators = []) {
    this.validators = validators;
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
    const errors = validators.map((v) => {
      return !v.isValid(value) && v.error(name, value);
    }).filter((v) => {
      return v;
    });
    this.setErrors(errors);
  }
}

class Field extends React.Component {
  field;

  constructor(props) {
    super(props);
    const {name, value = '', validators = []} = this.props;
    this.field = new FieldAttr(this, name, value, validators);
    this.field.validate();
    this.state = {
      value: this.field.value,
    };
  }

  componentWillMount() {
    const {onInit = () => {}} = this.props;
    onInit(this.field);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value || this.props.validators !== nextProps.validators) {
      const {onUpdate = () => {}} = nextProps;
      this.field.setValue(nextProps.value);
      this.field.setValidators(nextProps.validators);
      this.field.validate();
      this.updateState();
      onUpdate(this.field);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  componentWillUnmount() {
    const {onRemove = () => {}} = this.props;
    onRemove(this.field);
  }

  onFocus = (event) => {
    const {onFocus = () => {}} = this.props;
    this.field.setTouched(true);
    this.field.setFocus(true);
    onFocus(this.field, event);
  };

  onBlur = (event) => {
    const {onBlur = () => {}} = this.props;
    this.field.setFocus(false);
    onBlur(this.field, event);
  };

  onChange = (value, event) => {
    const {onChange = () => {}} = this.props;
    this.field.setValue(value);
    this.field.setDirty(true);
    this.field.validate();
    this.updateState();
    onChange(this.field, event);
  };

  validate = () => {
    const {onUpdate = () => {}} = this.props;
    this.field.setDirty(true);
    this.field.validate();
    onUpdate(this.field);
  };

  reset = (value = '') => {
    const {name, validators = [], onInit = () => {}} = this.props;
    this.field = new FieldAttr(this, name, value, validators);
    this.field.validate();
    this.setState({
      value: this.field.value
    }, () => {
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
};

Field.Input = FieldInput;

export {Field}