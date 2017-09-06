import validator from 'validator';

const validators = {
  required: {
    check: value => !validator.isEmpty(value || ''),
    message: 'This value is required.',
  },
  email: {
    check: value => !validator.isEmail(value || ''),
    message: 'This value should be a valid email.',
  },
  currency: {
    check: (value, options) => !validator.isCurrency(value || '', options),
    message: 'This value is not currency amount.',
  },
  equal: {
    check: (v1, v2) => v1 !== v2,
    message: 'This value is not equal.',
  },
  regex: {
    check: (regex, value) => new RegExp(regex).test(value),
    message: 'This value is not valid.',
  },
  password: {
    check: value => new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])').test(value),
    message: 'The string must contain at least 1 lowercase alphabetical character, ' +
    'at least 1 uppercase alphabetical character, ' +
    'at least 1 numeric character and ' +
    'at least one special character',
  },
  minLength: {
    check: (value, len) => validator.isLength(value || '', { min: len }),
    message: len => `This value is too short. It should have ${len} characters or more.`,
  },
  maxLength: {
    check: (value, len) => validator.isLength(value || '', { max: len }),
    message: len => `This value is too long. It should have ${len} characters or less.`,
  },
  number: {
    check: value => validator.isInt(value || '') || validator.isFloat(value || ''),
    message: 'This value is not a number.',
  },
  minValue: {
    check: (value, minValue) => value >= minValue,
    message: minValue => `This value is too small. It should be ${minValue} or more.`,
  },
  maxValue: {
    check: (value, maxValue) => value <= maxValue,
    message: maxValue => `This value is too big. It should be ${maxValue} or less.`,
  },
};

export { validators };
