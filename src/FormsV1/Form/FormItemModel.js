import { mergeWith } from 'lodash';
import FieldsModel from './FieldsModel';

class FormItemModel {
  constructor(name, validator) {
    this.name = name;
    this.validator = validator || (() => ([]));
    this.fields = new FieldsModel();
  }

  validate = () => {
    this.fields.validate();
  };

  reload = () => {
    this.fields.reload();
  };

  addErrors = (parentErrors = {}) => {
    const customizer = (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    };
    const errors = this.validator(this.fields, this.fields.data());
    const mergedErrors = mergeWith({...parentErrors}, errors, customizer);
    this.fields.addErrors(mergedErrors);
  };

  isValid = () => {
    return this.fields.isValid();
  };

  init = (data = {}) => {
    this.fields.init(data);
  };

  reset = () => {
    this.fields.reset();
  };

  makeDirty = () => {
    this.fields.makeDirty();
  };
}

export { FormItemModel };
