import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FieldErrorsComponent extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object,
  };

  static defaultProps = {
    field: null,
  };

  render() {
    const { form, field } = this.props;
    let errors = [];
    let invalid = false;
    if (field) {
      errors = field.getErrors();
      invalid = field.touched && !field.isValid();
    } else {
      errors = form.errors;
      invalid = form.isTouched() && form.errors.length;
    }
    return (
      <div>
        {invalid && (
          errors.map(error => (
            <div key={error}>{error}</div>
          ))
        )}
      </div>
    )
  }
}

export { FieldErrorsComponent };
