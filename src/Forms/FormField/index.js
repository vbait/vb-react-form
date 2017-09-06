/* eslint-disable no-console */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { FormModel } from '../Form';
import { Field, FieldProps, FieldModel } from '../Field';

class FormField extends PureComponent {
  static propTypes = {
    ...FieldProps,
  };

  static defaultProps = {
    onFocus: () => {},
    onChange: () => {},
    onBlur: () => {},
  };

  static contextTypes = {
    // formModel: PropTypes.instanceOf(FormModel).isRequired,
    formModel: PropTypes.object.isRequired, // TODO: need to investigate
  };

  constructor(props, context) {
    super(props, context);
    this.formModel = context.formModel;
    this.model = new FieldModel(
      this,
      props.name,
      props.value,
      props.validator,
      props.validatorOptions,
      props.asyncValidator,
      props.asyncValidatorOptions,
      props.disabled,
    );
    this.formModel.onInitField(this.model);
    this.updateComponent();
  }

  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;
    let shouldUpdate = false;
    if (currentProps.value !== nextProps.value) {
      this.model.setValue(nextProps.value);
      shouldUpdate = true;
    }
    if (currentProps.validatorOptions !== nextProps.validatorOptions) {
      this.model.setValidatorOptions(nextProps.validatorOptions);
      shouldUpdate = true;
    }
    if (currentProps.asyncValidatorOptions !== nextProps.asyncValidatorOptions) {
      this.model.setAsyncValidatorOptions(nextProps.asyncValidatorOptions);
      shouldUpdate = true;
    }
    if (currentProps.disabled !== nextProps.disabled) {
      this.model.setDisabled(nextProps.disabled);
      shouldUpdate = true;
    }
    if (shouldUpdate) {
      this.updateComponent();
    }
  }

  // shouldComponentUpdate() {
  //   if (this.shouldUpdate) {
  //     this.shouldUpdate = false;
  //     return true;
  //   }
  //   return false;
  // }

  onInit = () => {};

  onChange = (value = '') => {
    this.model.setValue(value);
    // this.model.setTouched(true);
    this.model.setDirty(true);
    this.updateComponent(FieldModel.events.CHANGE);
    this.forceUpdate();
    this.props.onChange(this.model);
  };

  onFocus = () => {
    this.model.setFocus(true);
    this.updateComponent(FieldModel.events.FOCUS);
    this.forceUpdate();
    this.props.onFocus(this.model);
  };

  onBlur = () => {
    this.model.setFocus(false);
    this.model.setTouched(true);
    this.updateComponent(FieldModel.events.BLUR);
    this.forceUpdate();
    this.props.onBlur(this.model);
  };

  updateComponent(event) {
    this.model.validate(this.formModel.getPublicModel().fields());
    this.model.asyncValidate(event, (active) => {
      if (active) {
        this.forceUpdate();
        this.formModel.onUpdateForm();
      }
    });
    this.formModel.onUpdateForm();
  }

  reset = () => {
    this.model.reset(this.props.value);
    this.updateComponent(FieldModel.events.CHANGE);
    this.forceUpdate();
    this.props.onChange(this.model);
  };

  update = (value) => {
    this.onChange(value);
  };

  render() {
    const { name, ...other } = this.props;
    const value = this.model.value;
    return (
      <Field
        {...other}
        name={name}
        value={value}
        model={this.model.getPublicModel()}
        onInit={this.onInit}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  }
}

export { FormField };
