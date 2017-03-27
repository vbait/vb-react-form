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
      getFieldByName: this.getFieldByName,
    }};
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {onSubmit = () => {}} = this.props;
    const {fields} = this.state;
    let isValid = true;
    const values = Object.keys(fields).reduce((temp, key) => {
      if (fields[key].errors.length) {
        fields[key].instance.validate();
        isValid = false;
      } else {
        temp[key] = fields[key].value;
      }
      return temp;
    }, {});
    if (isValid) {
      onSubmit(values);
    }
  };

  onInitField = (field) => {
    this.updateField(field);
  };

  onFocusField = (field) => {
    this.updateField(field);
  };

  onBlurField = (field) => {
    this.updateField(field);
  };

  onChangeField = (field) => {
    this.updateField(field);
  };

  onUpdateField = (field) => {
    this.updateField(field);
  };

  onRemoveField = (field) => {
    this.removeField(field);
  };

  getFieldByName = (name) => {
    return this.state.fields[name];
  };

  updateField = (field) => {
    const fields = {...this.state.fields};
    fields[field.name] = field;
    this.setState({fields: fields});
  };

  removeField = (field) => {
    const fields = {...this.state.fields};
    delete fields[field.name];
    this.setState({fields: fields});
  };

  reset = (value = {}) => {
    const {fields} = this.state;
    Object.keys(fields).forEach((key) => {
      fields[key].instance.reset(value[key]);
    });
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
