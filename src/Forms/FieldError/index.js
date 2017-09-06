import React from 'react';
import PropTypes from 'prop-types';
import { FormWrapper } from '../Form';
import { ErrorsComponent } from './ErrorsComponent';

class ErrorComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    model: PropTypes.object.isRequired,
    cmp: PropTypes.func,
  };

  static defaultProps = {
    cmp: null,
  };

  render() {
    const { name, model, cmp, ...other } = this.props;
    const field = model.fields(name);
    if (field && !field.isValid()) {
      return React.createElement(cmp || ErrorsComponent, {
        ...field.getAttrs(),
        ...other,
      });
    }
    return null;
  }
}

const FieldError = ({ component, ...other }) => (
  <FormWrapper component={ErrorComponent} cmp={component} {...other} />
);
FieldError.propTypes = {
  component: PropTypes.func,
};
FieldError.defaultProps = {
  component: null,
};

export { FieldError };
