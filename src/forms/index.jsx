export { Validator, RequiredValidator } from './validators';
export { Field } from './fields';
export { ModelField } from './model-fields';
import React from 'react';

class Form extends React.Component {
  getChildContext() {
    return {form: {
      addField: (field) => {
        console.log('addField', this.props.name, field);
      }
    }};
  }

  render() {
    const {children} = this.props;
    return children;
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
