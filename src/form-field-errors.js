import React from 'react';
import { FormContext } from './form-context';

class FormFieldErrorsComponent extends React.Component {
  render() {
    const {field, ...other} = this.props;
    return (field.dirty ? <div {...other}>
      {field.errors.map((error, index) => <div key={index}>{error}</div>)}
      {field.asyncErrors.map((error, index) => <div key={index}>{error}</div>)}
    </div> : null)
  };
}

class FormFieldErrors extends React.Component {
  subscriberId;
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.subscriberId = this.context.form.fields.subscribe(() => {
      this.forceUpdate();
    }, this.props.name);
  }

  componentWillUnmount() {
    if (this.subscriberId) {
      this.context.form.fields.removeSubscriber(this.subscriberId);
      this.subscriberId = null;
    }
  }

  render() {
    const {name, component, ...other} = this.props;
    const field = this.context.form.fields.getFieldOptions(name);
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