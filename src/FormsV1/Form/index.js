import React from 'react';
import PropTypes from 'prop-types';
import { FormModel } from './FormModel';
import { FormField } from '../FormField';

class VBForm extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    validator: PropTypes.func,
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
    this.model = new FormModel(props.name, props.validator, this.onChange);
  }

  getChildContext() {
    return { formModel: this.model };
  }

  componentDidMount() {
    this.model.completed();
  }

  onChange = () => {
    this.props.onChange(this.model.getPublicModel());
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { children, onSubmit, validator, ...other } = this.props;
    return (
      <form onSubmit={this.onSubmit} {...other}>{children}</form>
    );
  }
}

VBForm.Field = FormField;

export { VBForm, FormModel };
