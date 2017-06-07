import React from 'react';
import PropTypes from 'prop-types';

export const FieldProps = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  options: PropTypes.any,
  component: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  validators: PropTypes.arrayOf(PropTypes.shape({
    isValid: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
  })),
  validatorsOptions: PropTypes.shape({
    multi: PropTypes.bool,
  }),
  asyncValidator: PropTypes.func,
  asyncValidatorOptions: PropTypes.shape({
    validateOn: PropTypes.arrayOf(PropTypes.string),
    validateAfterLocal: PropTypes.bool,
  }),
};
