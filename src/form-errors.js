import React from 'react';
import { FormContext } from './form-context';
import { map } from 'lodash';

class FormErrorsComponent extends React.Component {
  render() {
    const {errors, ...other} = this.props;
    return <div {...other}>
      {map(errors, (error, key) => <div key={key || 'err'}>{error}</div>)}
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