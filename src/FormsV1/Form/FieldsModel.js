import FieldModel from './FieldModel';
class FieldsModel {
  constructor() {
    this.fields = {};
  }

  add = (props) => {
    const field = new FieldModel(props);
    this.fields[field.name] = field;
    return field;
  };

  field = (name) => {
    return this.fields[name];
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

  isValid = () => {
    return this.list().every(field => field.isValid());
  };

  values = () => {
    const values = {};
    this.list()
      .filter(field => !field.isExcluded())
      .forEach(field => values[field.name] = field.value);
    return values;
  }
}

export default FieldsModel;
