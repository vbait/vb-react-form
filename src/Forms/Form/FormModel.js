/* eslint-disable no-console */

import uuid from 'uuid/v1';
import PubSub from '../PubSub';

const privateModel = new WeakMap();

class PublicFormModel {
  constructor(model) {
    privateModel.set(this, model);
  }

  fields(name) {
    const model = privateModel.get(this);
    if (!model.initialized) {
      return null;
    }
    if (name) {
      return model.fields[name].getPublicModel();
    }
    return Object.keys(model.fields).reduce((prev, key) => {
      prev[key] = model.fields[key].getPublicModel();
      return prev;
    }, {});
  }

  badFields() {
    const model = privateModel.get(this);
    return Object.keys(model.fields).reduce((prev, key) => {
      if (!model.fields[key].isValid()) {
        prev[key] = model.fields[key].getPublicModel();
      }
      return prev;
    }, {});
  }

  forms(name) {
    const model = privateModel.get(this);
    if (name) {
      if (Array.isArray(model.forms[name])) {
        return model.forms[name].map(form => form.getPublicModel());
      }
      return model.forms[name].getPublicModel();
    }
    return Object.keys(model.forms).reduce((prev, key) => {
      if (Array.isArray(model.forms[key])) {
        prev[key] = model.forms[key].map(form => form.getPublicModel());
      } else {
        prev[key] = model.forms[key].getPublicModel();
      }
      return prev;
    }, {});
  }

  badForms() {
    const model = privateModel.get(this);
    return Object.keys(model.forms).reduce((prev, key) => {
      if (Array.isArray(model.forms[key])) {
        prev[key] = model.forms[key]
          .filter(form => !form.isValid())
          .map(form => form.getPublicModel());
        if (!prev[key].length) {
          delete prev[key];
        }
      } else if (!model.forms[key].isValid()) {
        prev[key] = model.forms[key].getPublicModel();
      }
      return prev;
    }, {});
  }

  reset() {
    const model = privateModel.get(this);
    model.reset();
  }

  update(values) {
    const model = privateModel.get(this);
    model.update(values);
  }

  isValid() {
    const model = privateModel.get(this);
    return model.isValid();
  }
}

class FormModel {
  constructor(name, onChange) {
    this.id = uuid();
    this.name = name;
    this.publicModel = new PublicFormModel(this);
    this.onChange = onChange || (() => {});
    this.initialized = false;
    this.fields = {};
    this.forms = {};
    this.excluded = false;
    this.subscribers = new PubSub();
  }

  createPublicModel() {
    return new PublicFormModel(this);
  }

  setExcluded(excluded) {
    this.excluded = !!excluded;
  }

  getPublicModel() {
    return this.publicModel;
  }

  onInitField(field) {
    this.fields[field.getName()] = field;
    this.onUpdateForm();
  }

  onRemoveField(field) {
    delete this.fields[field.name];
    this.onUpdateForm();
  }

  onInitForm(model, asList) {
    const name = model.name;
    if (!this.forms[name]) {
      this.forms[name] = asList ? [] : null;
    }
    if (asList) {
      this.forms[name].push(model);
    } else {
      this.forms[name] = model;
    }
  }

  onRemoveForm(model) {
    const name = model.name;
    if (Array.isArray(this.forms[name])) {
      const index = this.forms[name].findIndex(form => form.id === model.id);
      if (index > -1) {
        this.forms[name].splice(index, 1);
      }
      if (!this.forms[name].length) {
        delete this.forms[name];
      }
    } else {
      delete this.forms[name];
    }
    this.onUpdateForm();
  }

  onUpdateForm() {
    if (this.initialized) {
      this.validate();
      this.publish();
      this.onChange();
    }
  }

  setInitialized(initialized) {
    this.initialized = !!initialized;
  }

  validate() {
    Object.values(this.fields).forEach(field => field.instance.updateComponent());
  }

  reset() {
    Object.values(this.fields).forEach(field => field.instance.reset(false));
    Object.keys(this.forms).forEach((key) => {
      if (Array.isArray(this.forms[key])) {
        return this.forms[key].forEach(form => form.reset());
      }
      return this.forms[key].reset();
    });
    this.onUpdateForm();
  }

  update(values = {}) {
    Object.values(this.fields).forEach(field => field.setValue(values[field.name]));
    Object.keys(this.forms).forEach((key) => {
      if (Array.isArray(this.forms[key])) {
        const formsValues = values[key] || [];
        return this.forms[key].forEach((form, index) => form.update(formsValues[index]));
      }
      return this.forms[key].update(values[key]);
    });
    this.onUpdateForm();
  }

  setDirtyForm() {
    Object.values(this.fields).forEach((field) => {
      field.setDirty(true);
      field.setTouched(true);
    });
    this.onUpdateForm();
    Object.keys(this.forms).forEach((key) => {
      if (Array.isArray(this.forms[key])) {
        return this.forms[key].forEach(form => form.setDirtyForm());
      }
      return this.forms[key].setDirtyForm();
    });
  }

  publish() {
    this.subscribers.publish(this.fields);
  }

  addSubscriber(fn) {
    const subscriberId = this.subscribers.subscribe(fn);
    if (this.initialized) {
      this.publish();
    }
    return subscriberId;
  }

  removeSubscriber(id) {
    return this.subscribers.unsubscribe(id);
  }

  isValid() {
    const isFieldsValid = Object.values(this.fields).every(field => field.isValid());
    const isFormsValid = Object.keys(this.forms).every((key) => {
      if (Array.isArray(this.forms[key])) {
        return this.forms[key].every(form => form.isValid());
      }
      return this.forms[key].isValid();
    });
    return isFieldsValid && isFormsValid;
  }

  getValues() {
    const values = Object.keys(this.fields)
      .filter(key => !this.fields[key].excluded)
      .reduce((prev, key) => {
        prev[key] = this.fields[key].value;
        return prev;
      }, {});
    Object.keys(this.forms).reduce((prev, key) => {
      if (Array.isArray(this.forms[key])) {
        prev[key] = this.forms[key].filter(form => !form.excluded).map(form => form.getValues());
        if (!prev[key].length) {
          delete prev[key];
        }
      } else if (!this.forms[key].excluded) {
        prev[key] = this.forms[key].getValues();
      }
      return prev;
    }, values);
    return values;
  }
}

export { FormModel };
