import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.fields = {};
  }

  getChildContext() {
    return {form: {
      onInitField: this.onInitField,
      onFocusField: this.updateField,
      onBlurField: this.updateField,
      onChangeField: this.updateField,
      onUpdateField: this.updateField,
      onAsyncValid: this.updateField,
      onRemoveField: this.onRemoveField,
      getFieldByName: this.getFieldByName,
    }};
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentDidUpdate() {}

  onSubmit = (e) => {
    e.preventDefault();
    const {onSubmit = () => {}} = this.props;
    const fields = this.fields;
    let isValid = true;
    const values = Object.keys(fields).reduce((temp, key) => {
      if (fields[key].errors.length) {
        fields[key].instance.validate();
        isValid = false;
      } if (fields[key].pending || fields[key].asyncErrors.length) {
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
    this.fields[field.name] = field;
    this.returnFormState();
  };

  onRemoveField = (field) => {
    this.removeField(field);
  };

  updateField = (field) => {
    this.fields[field.name] = field;
    this.returnFormState();
    this.forceUpdate();
  };

  returnFormState() {
    const {onValid = () => {}} = this.props;
    const props = {
      pending: false,
      dirty: false,
      isValid: true,
    };
    Object.keys(this.fields).forEach((key) => {
      const field = this.fields[key];
      if (field.dirty) {
        props.dirty = true;
      }
      if (field.pending) {
        props.pending = true;
      }
      if (field.errors.length || field.asyncErrors.length) {
        props.isValid = false;
      }
    });
    onValid(props);
  }

  removeField = (field) => {
    delete this.fields[field.name];
  };

  getFieldByName = (name) => {
    return this.fields[name];
  };

  reset = (value = {}) => {
    Object.keys(this.fields).forEach((key) => {
      this.fields[key].instance.reset(value[key]);
    });
  };

  render() {
    const {children, onValid, ...other} = this.props;
    return (
      <form {...other} onSubmit={this.onSubmit}>{children}</form>
    );
  }
}
Form.propTypes = {
  name: React.PropTypes.any,
  children: React.PropTypes.any,
  onValid: React.PropTypes.any,
};
Form.childContextTypes = {
  form: React.PropTypes.any,
};

const formConnector = (component) => {
  return ((c) => {
    class WrapperComponent extends React.Component {
      render() {
        return React.createElement(c, {...this.props, ...this.context})
      }
    }
    WrapperComponent.contextTypes = {
      form: React.PropTypes.object.isRequired,
    };
    return WrapperComponent;
  })(component);
};

export {Form, formConnector};
