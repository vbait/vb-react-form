import React from 'react';
import PropTypes from 'prop-types';
import { FormModel } from './FormModel';
import { FormItem } from './FormItem';
import { FormField, FieldErrors } from '../FormField';
import { connectForm } from './decorator';

class VBForm extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    validator: PropTypes.func,
    children: PropTypes.any.isRequired,
    onLoadForm: PropTypes.func,
    onChangeForm: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    name: null,
    validator: () => ({}),
    onLoadForm: () => {},
    onChangeForm: () => {},
    onSubmit: () => {},
  };

  static childContextTypes = {
    formModel: PropTypes.instanceOf(FormModel).isRequired,
  };

  constructor(props) {
    super(props);
    this.model = new FormModel(props.name, props.validator, props.onChangeForm);
  }

  getChildContext() {
    return { formModel: this.model };
  }

  componentDidMount() {
    this.model.validate();
    this.model.completed();
    this.props.onLoadForm(this.model.getPublic());
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidUpdate() {
    // this.model.refresh();
  }

  componentWillUnmount() {
    this.model.willDelete();
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.model.isValid()) {
      this.model.makeSubmitted();
      this.props.onSubmit(this.model.values(), this.model.getPublic());
    }
  };

  render() {
    const { children, onSubmit, onChangeForm, onLoadForm, validator, ...other } = this.props;
    return (
      <form onSubmit={this.onSubmit} {...other}>{children}</form>
    );
  }
}

VBForm.Field = FormField;
VBForm.Errors = FieldErrors;
VBForm.Item = FormItem;

export { VBForm, FormModel, connectForm };
