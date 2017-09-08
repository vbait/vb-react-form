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
    if (props.initialized) {
      this.model.setDirty(true);
      this.model.setTouched(true);
    }
  }

  componentDidMount() {
    this.formModel.onInitField(this.model);
    // this.runAsyncValidation();
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
    this.model.setExcluded(nextProps.excluded);
    if (shouldUpdate) {
      // this.updateComponent();
      this.formModel.onUpdateForm();
    }
  }

  onInit = () => {};

  onChange = (value = '') => {
    this.model.setValue(value);
    this.model.setDirty(true);
    this.runAsyncValidation(FieldModel.events.CHANGE);
    this.formModel.onUpdateForm();
    this.props.onChange(this.model);
  };

  onFocus = () => {
    this.model.setFocus(true);
    this.runAsyncValidation(FieldModel.events.FOCUS);
    this.formModel.onUpdateForm();
    this.props.onFocus(this.model);
  };

  onBlur = () => {
    this.model.setFocus(false);
    this.model.setTouched(true);
    this.runAsyncValidation(FieldModel.events.BLUR);
    this.formModel.onUpdateForm();
    this.props.onBlur(this.model);
  };

  updateComponent() {
    this.model.validate(this.formModel.getPublicModel().fields());
    this.forceUpdate();
  }

  runAsyncValidation(event) {
    this.model.asyncValidate(event, (active) => {
      if (active) {
        this.forceUpdate();
        // this.formModel.onUpdateForm();
      }
    });
  }

  reset = (update = true) => {
    const { value, initialized } = this.props;
    this.model.reset();
    this.model.setValue(value);
    if (initialized) {
      this.model.setDirty(true);
      this.model.setTouched(true);
    }
    if (update) {
      this.formModel.onUpdateForm();
    }
    this.props.onChange(this.model);
  };

  update = (value) => {
    this.onChange(value);
  };

  render() {
    const { name, initialized, ...other } = this.props;
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
