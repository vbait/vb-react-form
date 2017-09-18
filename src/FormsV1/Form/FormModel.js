/* eslint-disable no-console */

import uuid from 'uuid/v1';
import PubSub from '../PubSub';
import FieldsModel from './FieldsModel';

class FormModel {
  constructor(name, validator) {
    this.id = uuid();
    this.name = name;
    this.validator = validator;
    this.initialized = false;
    this.subscribers = new PubSub();
    this.fields = new FieldsModel();
    this.forms = {};
  }

  completed = () => {
    this.initialized = true;
    this.validate();
    this.fields.reload();
  };

  validate = () => {
    this.fields.validate();
    const errors = this.validator(this.fields, this.fields.data());
    this.fields.addErrors(errors);
  };

  updateFieldByName = (name) => {
    this.fields.validate(name);
    const errors = this.validator(this.fields, this.fields.data());
    this.fields.addErrors(errors);
    this.fields.reload();
  };
}

export { FormModel };
