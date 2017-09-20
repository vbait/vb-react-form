import { cloneDeep } from 'lodash';

class FieldModel {
  constructor({ component, name, value, validator, reload, excluded }) {
    if (!name) {
      throw new Error('Name is required');
    }
    this.component = component;
    this.name = name;
    this.excluded = !!excluded;
    this.initialValue = value || '';
    this.handleReload = reload || (() => {});
    this.setValidator(validator);
    this.reset();
  }

  setValidator = (validator) => {
    this.validator = validator || (() => ([]));
  };

  setValue = (value = '') => {
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

  reload = () => {
    this.handleReload();
  };

  reset = () => {
    this.value = cloneDeep(this.initialValue);
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

  isValid = () => {
    return !this.errors.length && !this.formErrors.length;
  };

  isExcluded = () => {
    return this.excluded;
  };

  getErrors = () => {
    return [...this.errors, ...this.formErrors];
  };
}

export default FieldModel;
