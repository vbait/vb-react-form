import React from 'react';
import { Validator } from './validators';
import { getElementProps } from './utils';

export class FieldAttr {
  name = '';
  value = '';
  validators = [];
  errors = [];
  touched = false;
  dirty = false;
  pristine = true;

  constructor(name = '', value = '', validators = []) {
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

class FieldInput extends React.Component {
  onChange = (event) => {this.props.onChange(event.target.value, event);};
  render() {
    return (
      <input type="text" {...this.props} onChange={this.onChange} />
    )
  };
}

class Field extends React.Component {
  field;

  constructor(props) {
    super(props);
    const {name, value = '', validators = [], onInit = () => {}} = this.props;
    this.field = new FieldAttr(name, value, validators);
    this.field.validate();
    this.state = {
      value: this.field.value,
    };
    onInit(this.field);
  }

  componentWillReceiveProps(nextProps) {
    const {onUpdate = () => {}} = nextProps;
    this.field.setValue(nextProps.value);
    this.field.setValidators(nextProps.validators);
    this.field.validate();
    this.updateState();
    onUpdate(this.field);
  }

  componentWillUnmount() {
    const {onRemove = () => {}} = this.props;
    onRemove(this.field);
  }

  onFocus = (event) => {
    const {onFocus = () => {}} = this.props;
    this.field.setTouched(true);
    onFocus(this.field, event);
  };

  onBlur = (event) => {
    const {onBlur = () => {}} = this.props;
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

  updateState = () => {
    this.setState({value: this.field.value});
  };

  render() {
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

Field.Input = (props) => {
  return (
    <Field {...props} component={FieldInput}/>
  )
};

export {Field}