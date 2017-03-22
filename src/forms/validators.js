import React from 'react';
import validator from 'validator';

export class Validator {
  isValid(value) {
    return true;
  }

  error(name, value) {
    return 'Wrong value';
  }
}

export class RequiredValidator extends Validator {
  isValid(value) {
    return !validator.isEmpty(value || '');
  }

  error(name, value) {
    return 'This value is required.';
  }
}
