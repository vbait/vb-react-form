export { Validator, RequiredValidator } from './validators';
export { Field } from './fields';
export { ModelField } from './model-fields';
import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {values: {}, fields: {}};
  }

  getChildContext() {
    return {form: {
      onInitField: this.onInitField,
      onFocusField: this.onFocusField,
      onBlurField: this.onBlurField,
      onChangeField: this.onChangeField,
      onUpdateField: this.onUpdateField,
      onRemoveField: this.onRemoveField,
    }};
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {onSubmit = () => {}} = this.props;
    const {values} = this.state;
    onSubmit(values);
  };

  onInitField = (field) => {
  };

  onFocusField = (field) => {
  };

  onBlurField = (field) => {
  };

  onChangeField = (field) => {
  };

  onUpdateField = (field) => {
  };

  onRemoveField = (field) => {
  };

  render() {
    const {children} = this.props;
    return (
      <form {...this.props} onSubmit={this.onSubmit}>{children}</form>
    );
  }
}
Form.propTypes = {
  name: React.PropTypes.any,
  children: React.PropTypes.any,
};
Form.childContextTypes = {
  form: React.PropTypes.any,
};

export {Form};
