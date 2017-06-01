import { some, map, keyBy, forEach } from 'lodash';

// https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076

class Fields {
  constructor() {
    this.clear();
  }

  getFields() {
    return this.fields;
  }

  getFieldByName(name) {
    return this.getFields()[name];
  }

  getFieldOptions(name) {
    const field = this.getFieldByName(name);
    if (field) {
      return field.getFieldOptions();
    }
  }

  getFieldsOptions = () => {
    return keyBy(map(this.getFields(), (field) => {
      return this.getFieldOptions(field.name);
    }), 'name');
  };

  getValues = () => {
    const values = {};
    forEach(this.getFieldsOptions(), (field) => {
      values[field.name] = field.value;
    });
    return values;
  };

  getErrors = () => {
    const errors = {};
    forEach(this.getFieldsOptions(), (field) => {
      errors[field.name] = field.errors;
    });
    return errors;
  };

  updateField(field) {
    this.fields[field.name] = field;
  }

  isValid() {
    const fields = this.getFieldsOptions();
    let isValid = true;
    forEach(fields, (field) => {
      if (field.pending) {
        isValid = false;
      }
      if (field.errors.length || field.asyncErrors.length) {
        isValid = false;
      }
    });
    return isValid;
  }

  updateFieldsAsUsed() {
    forEach(this.getFields(), (field) => {
      field.instance.validate();
    });
  }

  reset(value = {}) {
    const promises = [];
    forEach(this.getFields(), (field, key) => {
      promises.push(field.instance.reset(value[key]));
    });
    return Promise.all(promises);
  }

  removeField(name) {
    delete this.fields[name];
  }

  subscribe(f, name) {
    const subscriber = {
      callback: f,
      id: ++this.lastId,
    };
    if (this.subscribers[name]) {
      this.subscribers[name].push(subscriber);
    } else {
      this.subscribers[name] = [subscriber];
    }
    this.publish(name);
    return this.lastId;
  }

  publish(name) {
    if (this.subscribers[name]) {
      this.subscribers[name].forEach(subscriber => {
        if (name) {
          subscriber.callback(this.getFieldOptions(name));
        } else {
          subscriber.callback(this.getFieldsOptions());
        }
      });
    }
  }

  removeSubscriber(id) {
    if (!id) {
      return null;
    }
    forEach(this.subscribers, (subscribers) => {
      for (let i = subscribers.length - 1; i >= 0; i--) {
        if (subscribers[i].id === id) {
          subscribers.splice(i, 1);
          return true
        }
      }
    });
  }

  clear() {
    this.subscribers = {};
    this.fields = {};
    this.lastId = 0;
  }
}

class Validators {
  constructor() {
    this.clear();
  }

  updateFields(fields = {}) {
    this.fields = fields;
  }

  updateValidators(validators) {
    this.validators = validators;
    this.errors = this.getErrors();
  }

  getErrors() {
    const errors = {};
    forEach(this.validators, (validator, name) => {
      errors[name] = validator(this.fields);
    });
    this.errors = errors;
    return errors;
  }

  isValid() {
    const errors = this.getErrors();
    return !some(errors, (v) => !!v);
  }

  subscribe(f, name) {
    const subscriber = {
      callback: f,
      id: ++this.lastId,
    };
    const sName = name || '__all__';
    if (this.subscribers[sName]) {
      this.subscribers[sName].push(subscriber);
    } else {
      this.subscribers[sName] = [subscriber];
    }
    return this.lastId;
  }

  publish() {
    const errors = this.getErrors();
    forEach(errors, (error, name) => {
      if (name !== '__all__') {
        const subscribers = this.subscribers[name] || [];
        subscribers.forEach((subscriber) => {
          subscriber.callback(error);
        });
      }
    });

    const subscribers = this.subscribers['__all__'] || [];
    subscribers.forEach((subscriber) => {
      subscriber.callback(errors);
    });
  }

  removeSubscriber(id) {
    if (!id) {
      return null;
    }
    forEach(this.subscribers, (subscribers) => {
      for (let i = subscribers.length - 1; i >= 0; i--) {
        if (subscribers[i].id === id) {
          subscribers.splice(i, 1);
          return true
        }
      }
    });
  }

  clear() {
    this.subscribers = {};
    this.validators = {};
    this.fields = {};
    this.errors = {};
    this.lastId = 0;
  }
}

export class FormContext {
  constructor() {
    this.initialized = false;
    this.fields = new Fields();
    this.validators = new Validators();
    this.errors = [];
    this.formValidators = {};
    this.formValidatorsOptions = {};
    this.formAsyncValidator = {};
    this.formAsyncValidatorOptions = {};
  }
  update() {
    this.validators.updateFields(this.fields.getFieldsOptions());
    this.validators.updateValidators(this.formValidators['']);
    this.validators.publish();
  }

  onInitField(field) {
    // console.log('onInitField', field);
    this.fields.updateField(field);
    this.fields.publish(field.name);
    this.fields.publish('');
    if (this.initialized) {
      this.update();
    }
  }

  onUpdateField(field) {
    // console.log('onUpdateField', field);
    this.fields.updateField(field);
    this.fields.publish(field.name);
    this.fields.publish('');
    this.update();
  }

  onRemoveField(field) {
    // console.log('onRemoveField', field);
    this.fields.removeField(field.name);
    this.update();
  }

  setValidators(validators = {}) {
    this.formValidators = validators;
  }

  setValidatorsOptions(options = {}) {
    this.formValidatorsOptions = options;
  }

  setAsyncValidator(validators = {}) {
    this.formAsyncValidator = validators;
  }

  setAsyncValidatorOptions(options = {}) {
    this.formAsyncValidatorOptions = options;
  }

  isValid() {
    return this.validators.isValid() && this.fields.isValid();
  }

  reset(value) {
    this.initialized = false;
    this.fields.reset(value).then(() => {
      this.initialized = true;
      this.update();
    });
  }

  clear() {
    this.setValidators();
    this.setValidatorsOptions();
    this.setAsyncValidator();
    this.setAsyncValidatorOptions();
    this.fields.clear();
    this.validators.clear();
  }
}