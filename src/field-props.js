import React from 'react';

export const FieldProps = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.any,
  options: React.PropTypes.any,
  component: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  validators: React.PropTypes.arrayOf(React.PropTypes.shape({
    isValid: React.PropTypes.func.isRequired,
    error: React.PropTypes.func.isRequired,
  })),
  validatorsOptions: React.PropTypes.shape({
    multi: React.PropTypes.bool,
  }),
  asyncValidator: React.PropTypes.func,
  asyncValidatorOptions: React.PropTypes.shape({
    validateOn: React.PropTypes.arrayOf(React.PropTypes.string),
    validateAfterLocal: React.PropTypes.bool,
  }),
};
