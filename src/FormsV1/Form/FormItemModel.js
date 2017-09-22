import uuid from 'uuid/v1';
import { mergeWith } from 'lodash';
import FieldsModel from './FieldsModel';
import FormsModel from './FormsModel';

class FormItemModel {
  constructor(name, validator, excluded = false) {
    this.id = uuid();
    this.name = name;
    this.excluded = excluded;
    this.validator = validator || (() => ([]));
    this.fields = new FieldsModel();
    this.forms = new FormsModel();
  }

  getPublic = () => {
    return null;
  };

  validate = () => {
    this.fields.validate();
    this.forms.validate();
  };

  reload = () => {
    this.fields.reload();
    this.forms.reload();
  };

  addErrors = (parentErrors = {}) => {
    const customizer = (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    };
    const errors = this.validator(this, this.fields, this.fields.data());
    const mergedErrors = mergeWith({...parentErrors}, errors, customizer);
    this.fields.addErrors(mergedErrors);
    this.forms.addErrors(mergedErrors);
  };

  isValid = () => {
    return this.fields.isValid() && this.forms.isValid();
  };

  isTouched = () => {
    return this.fields.isTouched() || this.forms.isTouched();
  };

  init = (data = {}) => {
    this.fields.init(data);
    this.forms.init(data);
  };

  reset = () => {
    this.fields.reset();
    this.forms.reset();
  };

  makeDirty = () => {
    this.fields.makeDirty();
    this.forms.makeDirty();
  };

  makeSubmitted = () => {
    this.fields.makeSubmitted();
    this.forms.makeSubmitted();
  };

  values = () => {
    return {...this.fields.values(), ...this.forms.values()};
  };

  getErrors = () => {
    return {
      fields: this.fields.errors(),
      forms: this.forms.errors(),
    };
  };
}

export { FormItemModel };
