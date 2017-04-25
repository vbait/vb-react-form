import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

export class FieldAttr {
  static events = {
    FOCUS: 'focus',
    CHANGE: 'change',
    BLUR: 'blur',
  };
  instance;
  name = '';
  value = '';
  validators = [];
  validatorsOptions = {};
  asyncValidator = null;
  asyncValidatorOptions = {};
  errors = [];
  asyncErrors = [];
  touched = false;
  dirty = false;
  pristine = true;
  focused = false;
  pending = false;

  constructor(
    instance, name = '', value,
    validators = [], validatorsOptions = {},
    asyncValidator = null, asyncValidatorOptions = {})
  {
    this.instance = instance;
    this.name = name;
    this.value = value;
    this.validators = validators;
    this.validatorsOptions = validatorsOptions;
    this.asyncValidator = asyncValidator;
    this.asyncValidatorOptions = asyncValidatorOptions;
  }

  setValue(value = '') {
    this.value = value;
  }

  setValidators(validators = []) {
    this.validators = validators;
  }

  setValidatorsOptions(options = {}) {
    this.validatorsOptions = options;
  }

  setAsyncValidator(validator) {
    this.asyncValidator = validator;
  }

  setAsyncValidatorOptions(options = {}) {
    this.asyncValidatorOptions = options;
  }

  setErrors(errors = []) {
    this.errors = errors;
  }

  setDirty(dirty) {
    this.dirty = !!dirty;
    this.pristine = !dirty;
  }

  setTouched(touched) {
    this.touched = !!touched;
  }

  setFocus(focused) {
    this.focused = !!focused;
  }

  validate() {
    const {validators, name, value} = this;
    const {multi = true} = this.validatorsOptions;
    if (multi) {
      const errors = validators.map((v) => {
        return !v.isValid(value) && v.error(name, value);
      }).filter((v) => {
        return v;
      });
      this.setErrors(errors);
    } else {
      this.setErrors([]);
      for (let v of validators) {
        if (!v.isValid(value)) {
          this.setErrors([v.error(name, value)]);
          break;
        }
      }
    }
  }

  asyncValidate(currentEvent, done) {
    if (currentEvent && currentEvent === FieldAttr.events.CHANGE) {
      this.asyncErrors = [];
    }
    const {asyncValidator, asyncValidatorOptions, errors} = this;
    const {validateOn = [], validateAfterLocal = false} = asyncValidatorOptions;
    if (validateAfterLocal && errors.length) {
      return done();
    }
    if (asyncValidator) {
      if (validateOn.length && validateOn.indexOf(currentEvent) === -1) {
        return done();
      }
      this.pending = true;
      asyncValidator(this.getFieldOptions())
        .then(() => {
          this.pending = false;
          this.asyncErrors = [];
          done(true);
        })
        .catch((errors) => {
          this.pending = false;
          this.asyncErrors = errors || [];
          done(true);
        });
    } else {
      done();
    }
  }

  getFieldOptions() {
    return cloneDeep({
      name: this.name,
      focused: this.focused,
      touched: this.touched,
      dirty: this.dirty,
      pristine: this.pristine,
      value: this.value,
      pending: this.pending,
      errors: this.errors,
      asyncErrors: this.asyncErrors,
      isValid: !this.errors.length && !this.asyncErrors.length,
    });
  }
}