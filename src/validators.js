import React from 'react';
import validator from 'validator';

export class Validator {
  convertValue(value) {
    return (value && value.toString()) || '';
  }

  isValid(value) {
    return true;
  }

  error(name, value) {
    return 'Wrong value';
  }
}

export class RegexValidator extends Validator {
  constructor(regex, message = '') {
    super();
    this.regex = new RegExp(regex);
    this.message = message;
  }

  isValid(value) {
    return this.regex.test(value);
  }

  error(name, value) {
    return this.message || 'This value is not valid.';
  }
}

export class RequiredValidator extends Validator {
  isValid(value) {
    return !validator.isEmpty(this.convertValue(value));
  }

  error(name, value) {
    return 'This value is required.';
  }
}

export class EmailValidator extends Validator {
  isValid(value) {
    return validator.isEmail(this.convertValue(value));
  }

  error(name, value) {
    return 'This value should be a valid email.';
  }
}

export class WebSiteValidator extends Validator {
  isValid(value) {
    return validator.isURL(this.convertValue(value));
  }

  error(name, value) {
    return 'This value should be a valid website.';
  }
}

export class PhoneValidator extends Validator {
  constructor(locale) {
    super();
    this.locale = locale;
  }

  isValid(value) {
    return validator.isMobilePhone(this.convertValue(value), this.locale);
  }

  error(name, value) {
    return 'This value should be a valid phone number.';
  }
}

export class CurrencyValidator extends Validator {
  constructor(options = {allow_negatives: false}) {
    super();
    this.options = options;
  }

  isValid(value) {
    return validator.isCurrency(this.convertValue(value), this.options);
  }

  error(name, value) {
    return 'This value is not currency amount.';
  }
}

export class PasswordValidator extends RegexValidator {
  // https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
  static strongRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])';
  static mediumRegex = '^((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))';
  constructor(strong = true) {
    super(strong ? PasswordValidator.strongRegex : PasswordValidator.mediumRegex);
    this.strong = strong;
  }

  error(name, value) {
    if (this.strong) {
      return 'The string must contain at least 1 lowercase alphabetical character, ' +
        'at least 1 uppercase alphabetical character, ' +
        'at least 1 numeric character and ' +
        'at least one special character';
    }
    return 'The string must contain at least 1 lowercase or uppercase alphabetical character and ' +
      'at least 1 numeric character';
  }
}

export class MinLengthValidator extends Validator {
  constructor(minLength) {
    super();
    this.minLength = minLength;
  }

  isValid(value) {
    return validator.isLength(this.convertValue(value), {min: this.minLength});
  }

  error(name, value) {
    return `This value is too short. It should have ${this.minLength} characters or more.`;
  }
}

export class MaxLengthValidator extends Validator {
  constructor(maxLength) {
    super();
    this.maxLength = maxLength;
  }

  isValid(value) {
    return validator.isLength(this.convertValue(value), {max: this.maxLength});
  }

  error(name, value) {
    return `This value is too long. It should have ${this.maxLength} characters or less.`;
  }
}

export class NumberValidator extends Validator {
  isValid(value) {
    return validator.isInt(this.convertValue(value)) || validator.isFloat(this.convertValue(value));
  }

  error(name, value) {
    return `This value is not a number.`;
  }
}

export class MinValueValidator extends NumberValidator {
  constructor(minValue) {
    super();
    this.minValue = minValue;
  }

  isValid(value) {
    return super.isValid(value) && value >= this.minValue;
  }

  error(name, value) {
    return `This value is too small. It should be ${this.minValue} or more.`;
  }
}

export class MaxValueValidator extends NumberValidator {
  constructor(maxValue) {
    super();
    this.maxValue = maxValue;
  }

  isValid(value) {
    return super.isValid(value) && value <= this.maxValue;
  }

  error(name, value) {
    return `This value is too big. It should be ${this.maxValue} or less.`;
  }
}