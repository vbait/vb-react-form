import React from 'react';
import { FormContext } from './form';
import map from 'lodash/map';

class FormErrorsComponent extends React.Component {
  render() {
    const {errors, ...other} = this.props;
    return <div {...other}>
      {map(errors, (error, key) => <div key={key || 'err'}>{error}</div>)}
    </div>
  };
}

class FormErrors extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {errors: {}};
  }

  componentDidMount() {
    (this.props.errors || []).forEach((name) => {
    });
    this.context.form.subscribeToValidators((errors) => {
      const err = {};
      (this.props.errors || []).forEach((name) => {
        err[name] = errors[name];
      });
      this.setState({errors: err});
    });
  }

  render() {
    const {component, ...other} = this.props;
    return React.createElement(component || FormErrorsComponent, {...other, ...this.state});
  };
}

FormErrors.propTypes = {
  errors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  component: React.PropTypes.func,
};

FormErrors.contextTypes = {
  form: React.PropTypes.instanceOf(FormContext).isRequired,
};

export {FormErrors};