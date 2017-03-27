import React from 'react';

class FormFieldValidatorComponent extends React.Component {
  render() {
    const {field, ...other} = this.props;
    return (field.dirty ? <div {...other}>
      {field.errors.map((error, index) => <div key={index}>{error}</div>)}
    </div> : null)
  };
}

class FormFieldValidator extends React.Component {

  constructor(props) {
    super(props);
  }

  getForm() {
    return this.context.form;
  };

  getFieldByName(name) {
    const form = this.getForm();
    return form.getFieldByName(name);
  }

  render() {
    const {name, component, ...other} = this.props;
    const field = this.getFieldByName(name);
    const element = React.createElement(component || FormFieldValidatorComponent, {
      field: field,
      ...other
    });
    return (field ? element : null)
  };
}

FormFieldValidator.propTypes = {
  name: React.PropTypes.string.isRequired,
  component: React.PropTypes.func,
};

FormFieldValidator.contextTypes = {
  form: React.PropTypes.object.isRequired,
};

export {FormFieldValidator};