import uuid from 'uuid/v1';
import { debounce } from 'lodash';
import PubSub from '../PubSub';
import FieldsModel from './FieldsModel';
import FormsModel from './FormsModel';
import FormModelPublic from './public/FormModelPublic';

class FormModel {
  constructor(name, validator, onChange, parent) {
    this.id = uuid();
    this.parent = parent;
    this.name = name;
    this.validator = validator;
    this.initialized = false;
    this.submitted = false;
    this.subscribers = new PubSub();
    this.fields = new FieldsModel();
    this.forms = new FormsModel();
    this.errors = [];
    this.onChange = onChange || (() => {});
    this.public = new FormModelPublic(this);
    this.refreshDebounce = debounce(this.refresh, 100);
  }

  getPublic = () => {
    return this.public;
  };

  completed = () => {
    this.initialized = true;
  };

  willDelete = () => {
    this.initialized = false;
    this.subscribers.unsubscribeAll();
    this.onChange = () => {};
  };

  validate = () => {
    this.fields.validate();
    this.forms.validate();
    this.refresh();
  };

  refresh = () => {
    const errors = this.validator(this.getPublic());
    this.updateErrors(errors['']);
    this.fields.addErrors(errors);
    this.forms.addErrors(errors);
    this.reload();
    this.publish();
    if (this.initialized) {
      this.onChange(this.getPublic());
    }
  };

  reload = () => {
    this.fields.reload();
    this.forms.reload();
  };

  reset = () => {
    this.submitted = false;
    this.fields.reset();
    this.forms.reset();
    this.validate();
  };

  init = (data = {}, makeDirty = false) => {
    this.submitted = false;
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

  makeSubmitted = () => {
    this.submitted = true;
    this.fields.makeSubmitted();
    this.forms.makeSubmitted();
    this.reload();
    this.publish();
  };

  isValid = () => {
    return !this.errors.length && this.fields.isValid() && this.forms.isValid();
  };

  isTouched = () => {
    return this.fields.isTouched() || this.forms.isTouched();
  };

  isSubmitted = () => {
    return this.submitted;
  };

  data = () => {
    return {...this.fields.data(), ...this.forms.data()};
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
      forms: this.forms.errors(),
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

  removeSubscriber = (id) => {
    return this.subscribers.unsubscribe(id);
  };

  publish = () => {
    this.subscribers.publish();
  };
}

export { FormModel };
