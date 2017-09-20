import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormModel } from '../Form/FormModel';
import { FormItemModel } from '../Form/FormItemModel';
import { FieldErrors } from './FieldErrors';
import { getElementProps } from './getElementProps';

class FormField extends PureComponent {
  static propTypes = {
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onUpdate: PropTypes.func,
    onFieldChange: PropTypes.func,
  };

  static defaultProps = {
    onFocus: () => {},
    onChange: () => {},
    onBlur: () => {},
    onUpdate: () => {},
    onFieldChange: () => {},
  };

  static contextTypes = {
    formModel: PropTypes.instanceOf(FormModel).isRequired, // TODO: need to investigate
    formItemModel: PropTypes.instanceOf(FormItemModel), // TODO: need to investigate
  };

  constructor(props, context) {
    super(props, context);
    const { formModel, formItemModel } = context;

    this.fields = formModel.fields;
    if (formItemModel) {
      this.fields = formItemModel.fields;
    }
    this.model = this.fields.add({component: this, reload: this.handleReload, ...props});
    this.formModel = formModel;
    this.formItemModel = formItemModel;
  }

  componentDidMount() {
    if (this.formModel.initialized) {
      this.formModel.validate();
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(33333, nextProps);
    this.model.setSubmissionErrors(nextProps.submissionErrors);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.fields.remove(this.model.name);
    if (this.formModel.initialized) {
      this.formModel.validate();
    }
  }

  handleReload = () => {
    this.forceUpdate();
    this.props.onUpdate(this.model);
    this.props.onFieldChange(this.model);
  };

  onInit = () => {};

  onChange = (value = '') => {
    if (this.model.submitted) {
      this.model.changedAfterSubmit = true;
    }
    this.model.setValue(value);
    this.model.setDirty(true);
    this.model.validate();
    this.formModel.refresh();
    // this.formModel.updateFieldByName(this.model.name);
    this.props.onChange(this.model);
    // this.props.onFieldChange(this.model, 'change');
  };

  onFocus = () => {
    this.model.setFocus(true);
    this.model.validate();
    this.formModel.refresh();
    //this.formModel.updateFieldByName(this.model.name);
    this.props.onFocus(this.model);
    // this.props.onFieldChange(this.model, 'focus');
  };

  onBlur = () => {
    this.model.setFocus(false);
    this.model.setTouched(true);
    this.model.validate();
    this.formModel.refresh();
    // this.formModel.updateFieldByName(this.model.name);
    this.props.onBlur(this.model);
    // this.props.onFieldChange(this.model, 'blur');
  };

  render() {
    const {
      component,
      includeModel,
    } = this.props;

    const props = {
      ...getElementProps(this.props),
      value: this.model.value,
      onFocus: this.onFocus,
      onChange: this.onChange,
      onBlur: this.onBlur,
    };
    if (includeModel) {
      props.model = this.model;
    }
    return React.createElement(component, props);
    // return React.createElement(component, {
    //   value: this.model.value,
    //   model: this.model,
    //   fieldProps: getElementProps(this.props),
    //   onFocus: this.onFocus,
    //   onChange: this.onChange,
    //   onBlur: this.onBlur,
    // });
  }
}

export { FormField, FieldErrors };
