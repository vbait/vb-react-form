import { cloneDeep } from 'lodash';
import FieldModelPublic from './public/FieldModelPublic';

class FieldModel {
  constructor({ component, name, value, validator, reload, excluded }) {
    if (!name) {
      throw new Error('Name is required');
    }
    this.component = component;
    this.name = name;
    this.excluded = !!excluded;
    this.initialValue = value;
    this.handleReload = reload || (() => {});
    this.setValidator(validator);
    this.reset();
    this.submissionErrors = [];
    this.public = new FieldModelPublic(this);
  }

  getPublic = () => {
    return this.public;
  };

  setValidator = (validator) => {
    this.validator = validator || (() => ([]));
  };

  setValue = (value) => {
    this.value = value;
  };

  setFocus = (focused) => {
    this.focused = focused;
  };

  setTouched = (touched) => {
    this.touched = touched;
  };

  setDirty = (dirty) => {
    this.dirty = dirty;
  };

  validate = () => {
    this.errors = [];
    this.errors = this.validator(this.name, this.value) || [];
  };

  setFormErrors = (errors) => {
    this.formErrors = [];
    if (Array.isArray(errors)) {
      this.formErrors = errors;
    } else if (errors) {
      this.formErrors = [errors];
    }
  };

  setSubmissionErrors = (errors) => {
    this.submissionErrors = [];
    if (Array.isArray(errors)) {
      this.submissionErrors = errors;
    } else if (errors) {
      this.submissionErrors = [errors];
    }
  };

  reload = () => {
    this.handleReload();
  };

  reset = () => {
    this.setValue(cloneDeep(this.initialValue));
    this.focused = false;
    this.touched = false;
    this.dirty = false;
    this.submitted = false;
    this.changedAfterSubmit = false;
    this.errors = [];
    this.formErrors = [];
  };

  makeDirty = () => {
    this.touched = true;
    this.dirty = true;
  };

  makeSubmitted = () => {
    this.submitted = true;
    this.changedAfterSubmit = false;
  };

  isValid = () => {
    let isValid = !this.errors.length && !this.formErrors.length;
    if (this.submitted && !this.changedAfterSubmit) {
      return isValid && !this.submissionErrors.length;
    }
    return isValid;
  };

  isExcluded = () => {
    return this.excluded;
  };

  getErrors = () => {
    let errors = [...this.errors, ...this.formErrors];
    if (this.submitted && !this.changedAfterSubmit) {
      errors = [...errors, ...this.submissionErrors];
    }
    return errors;
  };
}

export default FieldModel;
