import React from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './form-context';

class FormErrorsComponent extends React.Component {
  render() {
    const {errors, errorList, ...other} = this.props;
    return <div {...other}>
      {errorList.map((error, index) => <div key={index}>{error}</div>)}
    </div>
  };
}

class FormErrors extends React.Component {
  subscriberId;
  constructor(props, context) {
    super(props, context);
    this.state = {errors: {}};
  }

  componentDidMount() {
    this.subscriberId = this.context.form.validators.subscribe((errors) => {
      const err = {};
      (this.props.errors || []).forEach((name) => {
        err[name] = errors[name];
      });
      this.setState({errors: err});
    });
  }

  componentWillUnmount() {
    if (this.subscriberId) {
      this.context.form.validators.removeSubscriber(this.subscriberId);
      this.subscriberId = null;
    }
  }

  render() {
    const {component, errors, ...other} = this.props;
    const errorList = errors.map((key) => {
      return this.state.errors[key];
    }).filter((error) => !!error);
    return React.createElement(component || FormErrorsComponent, {...other, ...this.state, errorList});
  };
}

FormErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  component: PropTypes.func,
};

FormErrors.contextTypes = {
  form: PropTypes.instanceOf(FormContext).isRequired,
};

export {FormErrors};