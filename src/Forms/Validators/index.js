import { validators } from './validators';

const requiredValidator = (value = '') => {
  const errors = [];
  if (!validators.required.check(value)) {
    errors.push(validators.required.message);
  }
  return errors;
};

const emailValidator = (value = '') => {
  const errors = [];
  if (!validators.email.check(value)) {
    errors.push(validators.email.message);
  }
  return errors;
};

const equalValidator = (value1 = '', value2 = '') => {
  const errors = [];
  if (!validators.equal.check(value1, value2)) {
    errors.push(validators.equal.message);
  }
  return errors;
};

const regexValidator = (value = '', regex) => {
  const errors = [];
  if (!validators.regex.check(regex, value)) {
    errors.push(validators.regex.message);
  }
  return errors;
};

const passwordValidator = (value = '') => {
  const errors = [];
  if (!validators.password.check(value)) {
    errors.push(validators.password.message);
  }
  return errors;
};

const minLengthValidator = (value = '', len) => {
  const errors = [];
  if (!validators.minLength.check(value, len)) {
    errors.push(validators.minLength.message(len));
  }
  return errors;
};

const maxLengthValidator = (value = '', len) => {
  const errors = [];
  if (!validators.maxLength.check(value, len)) {
    errors.push(validators.maxLength.message(len));
  }
  return errors;
};

export {
  validators,
  requiredValidator,
  emailValidator,
  equalValidator,
  regexValidator,
  passwordValidator,
  minLengthValidator,
  maxLengthValidator,
};
