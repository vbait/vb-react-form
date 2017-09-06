import React from 'react';
import PropTypes from 'prop-types';
import { FormModel } from './FormModel';
import { FormField } from '../FormField';
import { FieldError } from '../FieldError';
import { FormWrapper } from './FormWrapper';
import { FormItem } from './FormItem';

class VBForm extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    onLoad: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    name: null,
    onLoad: () => {},
    onChange: () => {},
    onSubmit: () => {},
  };

  static childContextTypes = {
    formModel: PropTypes.instanceOf(FormModel).isRequired,
  };

  constructor(props) {
    super(props);
    this.model = new FormModel(props.name, this.onChange);
  }

  getChildContext() {
    return { formModel: this.model };
  }

  componentDidMount() {
    this.model.validate();
    this.model.setInitialized(true);
    this.props.onLoad(this.model.getPublicModel());
    this.model.publish();
  }

  onChange = () => {
    this.props.onChange(this.model.getPublicModel());
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.model.setDirtyForm();
    if (this.model.isValid()) {
      const values = this.model.getValues();
      this.props.onSubmit(values, this.model.getPublicModel());
    }
  };

  reset = () => {
    this.model.reset();
  };

  update = (values) => {
    this.model.update(values);
  };

  render() {
    const { children, onSubmit, ...other } = this.props;
    return (
      <form onSubmit={this.onSubmit} {...other}>{children}</form>
    );
  }
}

VBForm.Item = FormItem;
VBForm.Field = FormField;
VBForm.Wrapper = FormWrapper;
VBForm.FieldError = FieldError;

export { VBForm, FormModel, FormWrapper };
