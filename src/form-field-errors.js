import React from 'react';
import { FormContext } from './form';

class FormFieldErrorsComponent extends React.Component {
  render() {
    const {field, ...other} = this.props;
    return <div {...other}>
      {field.errors.map((error, index) => <div key={index}>{error}</div>)}
      {field.asyncErrors.map((error, index) => <div key={index}>{error}</div>)}
    </div>
  };
}

class FormFieldErrors extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.context.form.subscribeByName(() => {
      this.forceUpdate();
    }, this.props.name);
  }

  render() {
    const {name, component, ...other} = this.props;
    const field = this.context.form.getFieldByName(name);
    const element = React.createElement(component || FormFieldErrorsComponent, {
      field: field,
      ...other,
    });
    return (field ? element : null)
  };
}

FormFieldErrors.propTypes = {
  name: React.PropTypes.string.isRequired,
  component: React.PropTypes.func,
};

FormFieldErrors.contextTypes = {
  form: React.PropTypes.instanceOf(FormContext).isRequired,
};

export {FormFieldErrors};