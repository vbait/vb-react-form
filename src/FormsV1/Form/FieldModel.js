
class FieldModel {
  constructor({ component, name, value, validator, reload }) {
    if (!name) {
      throw new Error('Name is required');
    }
    this.component = component;
    this.name = name;
    this.value = value || '';
    this.focused = false;
    this.touched = false;
    this.dirty = false;
    this.changed = false;
    this.submitted = false;
    this.changedAfterSubmit = false;
    this.handleReload = reload || (() => {});

    this.errors = [];
    this.formErrors = [];
    this.validator = validator || (() => ([]));
  }

  setValue = (value = '') => {
    this.value = value;
  };

  setFocus = (focused) => {
    this.focused = focused;
  };

  setTouched = (touched) => {
    this.touched = touched;
  };

  setChanged = (changed) => {
    this.changed = changed;
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

  isValid = () => {
    return !this.errors.length && !this.formErrors.length;
  };

  getErrors = () => {
    return [...this.errors, this.formErrors];
  };
}

export default FieldModel;
