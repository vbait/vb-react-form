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
    onLoad: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    name: null,
    validator: () => ({}),
    onLoad: () => {},
    onChange: () => {},
    onSubmit: () => {},
  };

  static childContextTypes = {
    formModel: PropTypes.instanceOf(FormModel).isRequired,
  };

  constructor(props) {
    super(props);
    this.model = new FormModel(props.name, props.validator, props.onChange);
  }

  getChildContext() {
    return { formModel: this.model };
  }

  componentDidMount() {
    this.model.completed();
    this.props.onLoad(this.model, this.model.getPublic());
  }

  componentWillReceiveProps(nextProps) {
    // console.log(22222, nextProps);
  }

  componentDidUpdate() {
    this.model.refresh();
  }

  componentWillUnmount() {
    this.model.willDelete();
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.model.isValid()) {
      this.model.makeSubmitted();
      this.props.onSubmit(this.model.values(), this.model);
    }
  };

  render() {
    const { children, onSubmit, onChange, validator, ...other } = this.props;
    return (
      <form onSubmit={this.onSubmit} {...other}>{children}</form>
    );
  }
}

VBForm.Field = FormField;
VBForm.Errors = FieldErrors;
VBForm.Item = FormItem;

export { VBForm, FormModel, connectForm };
