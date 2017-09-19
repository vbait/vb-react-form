/* eslint-disable no-console */

import uuid from 'uuid/v1';
import PubSub from '../PubSub';
import FieldsModel from './FieldsModel';

class FormModel {
  constructor(name, validator, onChange) {
    this.id = uuid();
    this.name = name;
    this.validator = validator;
    this.initialized = false;
    this.subscribers = new PubSub();
    this.fields = new FieldsModel();
    this.errors = [];
    this.forms = {};
    this.onChange = onChange || (() => {});
  }

  completed = () => {
    this.initialized = true;
    this.validate();
  };

  validate = () => {
    this.fields.validate();
    const errors = this.validator(this.fields, this.fields.data());
    this.updateErrors(errors['']);
    this.fields.addErrors(errors);
    this.fields.reload();
    this.onChange(this);
  };

  updateFieldByName = (name) => {
    this.fields.validate(name);
    const errors = this.validator(this.fields, this.fields.data());
    this.updateErrors(errors['']);
    this.fields.addErrors(errors);
    this.fields.reload();
    this.onChange(this);
  };

  reset = () => {
    this.fields.reset();
    this.validate();
  };

  init = (data = {}, makeDirty = false) => {
    this.fields.reset();
    this.fields.init(data);
    if (makeDirty) {
      this.makeDirty();
    }
    this.validate();
  };

  makeDirty = () => {
    this.fields.makeDirty();
    this.validate();
  };

  isValid = () => {
    return !this.errors.length && this.fields.isValid();
  };

  values = () => {
    return this.fields.values();
  };

  updateErrors = (errors) => {
    this.errors = [];
    if (Array.isArray(errors)) {
      this.errors = errors;
    } else if (errors) {
      this.errors = [errors];
    }
  };
}

export { FormModel };
