import FieldModel from './FieldModel';
class FieldsModel {
  constructor() {
    this.fields = {};
  }

  get = (name) => {
    return this.fields[name];
  };

  field = (name) => {
    return this.fields[name];
  };

  add = (props) => {
    const field = new FieldModel(props);
    this.fields[field.name] = field;
    return field;
  };

  remove = (name) => {
    delete this.fields[name];
  };

  validate = (name) => {
    if (name) {
      this.fields[name].validate();
    } else {
      this.list().forEach(field => field.validate());
    }
  };

  addErrors = (errors) => {
    this.list().forEach((field) => {
      const error = errors[field.name];
      field.setFormErrors(error);
    });
  };

  reload = () => {
    this.list().forEach(field => field.reload());
  };

  list = () => {
    return Object.values(this.fields);
  };

  data = () => {
    const data = {};
    this.list().forEach(field => data[field.name] = field.value);
    return data;
  };

  reset = (name) => {
    if (name) {
      this.fields[name].reset();
    } else {
      this.list().forEach(field => field.reset());
    }
  };

  init = (data = {}) => {
    this.list().forEach(field => field.setValue(data[field.name]));
  };

  makeDirty = () => {
    this.list().forEach(field => field.makeDirty());
  };

  makeSubmitted = () => {
    this.list().forEach(field => field.makeSubmitted());
  };

  isValid = () => {
    return this.list().every(field => field.isValid());
  };

  isTouched = () => {
    return this.list().some(field => field.touched);
  };

  values = () => {
    const values = {};
    this.list()
      .filter(field => !field.isExcluded())
      .forEach(field => values[field.name] = field.value);
    return values;
  };

  errors = () => {
    const errors = {};
    this.list().forEach(field => errors[field.name] = field.getErrors());
    return errors;
  };
}

export default FieldsModel;
