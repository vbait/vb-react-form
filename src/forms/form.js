import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {values: {}, fields: {}};
    this.fields = {};
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

  componentDidMount() {
    // this.forceUpdate();
  }

  onSubmit = (e) => {
    e.preventDefault();
    //this.setState({values: 1});
    // this.forceUpdate();

    const {onSubmit = () => {}} = this.props;
    const fields = this.fields;
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
    this.fields[field.name] = field;
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
    return this.fields[name];
  };

  updateField = (field) => {
    this.fields[field.name] = field;
    this.forceUpdate();
  };

  removeField = (field) => {
    delete this.fields[field.name];
  };

  reset = (value = {}) => {
    Object.keys(this.fields).forEach((key) => {
      this.fields[key].instance.reset(value[key]);
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
