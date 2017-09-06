import { cloneDeep } from 'lodash';

const privateModel = new WeakMap();

class PublicFieldModel {
  constructor(model) {
    privateModel.set(this, model);
  }

  getName() {
    const model = privateModel.get(this);
    return model.name;
  }

  getValue() {
    const model = privateModel.get(this);
    return cloneDeep(model.value);
  }

  isValid() {
    const model = privateModel.get(this);
    return model.isValid();
  }

  isDirty() {
    const model = privateModel.get(this);
    return model.dirty;
  }

  isDisabled() {
    const model = privateModel.get(this);
    return model.disabled;
  }

  getAttrs() {
    const model = privateModel.get(this);
    return cloneDeep({
      name: model.name,
      value: model.value,
      touched: model.touched,
      dirty: model.dirty,
      pristine: model.pristine,
      focused: model.focused,
      pending: model.pending,
      errors: model.errors,
      asyncErrors: model.asyncErrors,
      validatorOptions: model.validatorOptions,
      asyncValidatorOptions: model.asyncValidatorOptions,
      isValid: !model.errors.length && !model.asyncErrors.length,
    });
  }

  reset(value) {
    const model = privateModel.get(this);
    return model.instance.reset(value);
  }
}

class FieldModel {
  static events = {
    FOCUS: 'focus',
    CHANGE: 'change',
    BLUR: 'blur',
  };
  instance;
  name = '';
  value = '';
  validator = () => [];
  validatorOptions = {};
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
    instance,
    name = '',
    value = '',
    validator = () => [],
    validatorOptions = {},
    asyncValidator = null,
    asyncValidatorOptions = {},
    disabled,
  ) {
    this.instance = instance;
    this.name = name;
    this.value = value;
    this.validator = validator;
    this.validatorOptions = validatorOptions;
    this.asyncValidator = asyncValidator;
    this.asyncValidatorOptions = asyncValidatorOptions;
    this.publicModel = this.createPublicModel();
    this.disabled = !!disabled;
  }

  createPublicModel() {
    return new PublicFieldModel(this);
  }

  getPublicModel() {
    return this.publicModel;
  }

  setValue(value) {
    this.value = value;
  }

  setValidators(validators = []) {
    this.validators = validators;
  }

  setValidatorOptions(options = {}) {
    this.validatorOptions = options;
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

  setDisabled(disabled) {
    this.disabled = !!disabled;
  }

  getName() {
    return this.name;
  }

  validate(fields) {
    this.setErrors([]);
    const { validator, name, value, disabled } = this;
    if (disabled) {
      return;
    }
    const { multi = true } = this.validatorOptions;
    const errors = validator(name, value, fields) || [];
    if (errors.length) {
      if (multi) {
        this.setErrors(errors);
      } else {
        this.setErrors([[errors[0]]]);
      }
    }
  }

  asyncValidate(currentEvent, done) {
    if (currentEvent && currentEvent === FieldModel.events.CHANGE) {
      this.asyncErrors = [];
    }
    const { asyncValidator, asyncValidatorOptions, errors, disabled } = this;
    const { validateOn = [], validateAfterLocal = false } = asyncValidatorOptions;
    if (disabled || (validateAfterLocal && errors.length)) {
      return done();
    }
    if (asyncValidator) {
      if (validateOn.length && validateOn.indexOf(currentEvent) === -1) {
        return done();
      }
      this.pending = true;
      asyncValidator(this.getPublicModel())
        .then(() => {
          this.pending = false;
          this.asyncErrors = [];
          done(true);
        })
        .catch((e) => {
          this.pending = false;
          this.asyncErrors = e || [];
          done(true);
        });
    } else {
      done();
    }
    return null;
  }

  reset(value = '') {
    this.setValue(value);
    this.touched = false;
    this.dirty = false;
    this.pristine = true;
    this.focused = false;
    this.pending = false;
  }

  isValid() {
    return !this.errors.length && !this.asyncErrors.length;
  }
}

export { FieldModel };
