import uuid from 'uuid/v1';
import PubSub from '../PubSub';
import FieldsModel from './FieldsModel';
import FormsModel from './FormsModel';

class FormModel {
  constructor(name, validator, onChange, parent) {
    this.id = uuid();
    this.parent = parent;
    this.name = name;
    this.validator = validator;
    this.initialized = false;
    this.subscribers = new PubSub();
    this.fields = new FieldsModel();
    this.forms = new FormsModel();
    this.errors = [];
    this.onChange = onChange || (() => {});
  }

  completed = () => {
    this.initialized = true;
    this.validate();
  };

  validate = () => {
    this.fields.validate();
    this.forms.validate();
    const errors = this.validator(this.fields, this.fields.data());
    this.updateErrors(errors['']);
    this.fields.addErrors(errors);
    // this.fields.reload();
    // this.publish();
    // this.onChange(this);
    this.refreshAll();
  };

  updateFieldByName = (name) => {
    this.fields.validate(name);
    const errors = this.validator(this.fields, this.fields.data());
    this.updateErrors(errors['']);
    this.fields.addErrors(errors);
    // this.fields.reload();
    // this.publish();
    // this.onChange(this);
    this.refreshAll();
  };

  refreshAll = () => {
    if (this.parent) {
      this.parent.refreshAll();
    } else {
      this.reload();
      this.publish();
      this.onChange(this);
    }
  };

  reload = () => {
    this.fields.reload();
    this.forms.reload();
  };

  reset = () => {
    this.fields.reset();
    this.forms.reset();
    this.validate();
  };

  init = (data = {}, makeDirty = false) => {
    this.fields.reset();
    this.forms.reset();
    this.fields.init(data);
    this.forms.init(data);
    if (makeDirty) {
      this.fields.makeDirty();
      this.forms.makeDirty();
    }
    this.validate();
  };

  makeDirty = () => {
    this.fields.makeDirty();
    this.forms.makeDirty();
    this.validate();
  };

  isValid = () => {
    return !this.errors.length && this.fields.isValid() && this.forms.isValid();
  };

  isTouched = () => {
    return this.fields.isTouched() || this.forms.isTouched();
  };

  values = () => {
    return {...this.fields.values(), ...this.forms.values()};
  };

  updateErrors = (errors) => {
    this.errors = [];
    if (Array.isArray(errors)) {
      this.errors = errors;
    } else if (errors) {
      this.errors = [errors];
    }
  };

  getErrors = () => {
    return {
      fields: this.fields.errors(),
      form: this.errors,
    };
  };

  addSubscriber = (fn) => {
    const subscriberId = this.subscribers.subscribe(fn);
    if (this.initialized) {
      this.publish();
    }
    return subscriberId;
  };

  removeSubscriber = () => {
    return this.subscribers.unsubscribe(id);
  };

  publish = () => {
    this.forms.publish();
    this.subscribers.publish(this.fields.errors(), this.errors);
  };
}

export { FormModel };
