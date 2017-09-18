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
}

export default FieldsModel;
