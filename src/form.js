import React from 'react';
import map from 'lodash/map';
import keyBy from 'lodash/keyBy';
import forEach from 'lodash/forEach';
import { getElementProps } from './utils';

// https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076

class FormContext {
  constructor() {
    this.subscriptions = []
  }

  setColor(color) {
    this.subscriptions.forEach(f => f())
  }

  subscribe(f) {
    this.subscriptions.push(f)
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.formContext = new FormContext();
  }

  getChildContext() {
    return {form: this.formContext};
  }

  componentWillReceiveProps(nextProps) {

  }

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const {children} = this.props;
    return (
      <form {...getElementProps(this.props)} onSubmit={this.onSubmit} noValidate>{children}</form>
    );
  }
}
Form.propTypes = {
  name: React.PropTypes.any,
  children: React.PropTypes.any,
  onSubmit: React.PropTypes.any,
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
