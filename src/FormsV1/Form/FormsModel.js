import { FormItemModel } from './FormItemModel';

class FormsModel {
  constructor() {
    this.forms = {};
  }

  add = (name, validator, asList) => {
    const model = new FormItemModel(name, validator);
    if (asList) {
      if (!this.forms[name]) {
        this.forms[name] = [];
        this.forms[name].push(model);
      }
    } else {
      this.forms[name] = model;
    }
    return model;
  };

  validate = () => {
    this.list().forEach(form => form.validate());
  };

  reload = () => {
    this.list().forEach(form => form.reload());
  };

  addErrors = (errors) => {
    Object.keys(this.forms).forEach((key) => {
      if (Array.isArray(this.forms[key])) {
        const formsErrors = errors[key] || [];
        return this.forms[key].forEach((form, index) => form.addErrors(formsErrors[index]));
      }
      console.log(key, errors, errors[key]);
      return this.forms[key].addErrors(errors[key]);
    });
  };

  isValid = () => {
    return this.list().every(form => form.isValid());
  };

  init = (data) => {
    Object.keys(this.forms).forEach((key) => {
      if (Array.isArray(this.forms[key])) {
        const formsValues = data[key] || [];
        return this.forms[key].forEach((form, index) => form.init(formsValues[index]));
      }
      return this.forms[key].init(data[key]);
    });
  };

  reset = () => {
    this.list().forEach(form => form.reset());
  };

  makeDirty = () => {
    this.list().forEach(form => form.makeDirty());
  };

  list = () => {
    return Object.values(this.forms).reduce((list, current) => {
      if (Array.isArray(current)) {
        list = [...list, ...current];
      } else {
        list.push(current);
      }
      return list;
    }, []);
  };
}

class FormsModel1 {
  constructor() {
    this.forms = {};
  }

  add = (model, asList) => {
    if (asList) {
      if (!this.forms[model.name]) {
        this.forms[model.name] = [];
        this.forms[model.name].push(model);
      }
    } else {
      this.forms[model.name] = model;
    }
  };

  validate = () => {
    this.list().forEach(form => form.validate());
  };

  makeDirty = () => {
    this.list().forEach(form => form.makeDirty());
  };

  reset = () => {
    this.list().forEach(form => form.reset());
  };

  reload = () => {
    this.list().forEach(form => form.reload());
  };

  publish = () => {
    this.list().forEach(form => form.publish());
  };

  init = (data = {}) => {
    Object.keys(this.forms).forEach((key) => {
      if (Array.isArray(this.forms[key])) {
        const formsValues = data[key] || [];
        return this.forms[key].forEach((form, index) => form.init(formsValues[index]));
      }
      return this.forms[key].init(data[key]);
    });
  };

  isTouched = () => {
    return this.list().some(form => form.isTouched());
  };

  isValid = () => {
    return this.list().every(form => form.isValid());
  };

  values = () => {
    return {};
  };

  list = () => {
    return Object.values(this.forms).reduce((list, current) => {
      if (Array.isArray(current)) {
        list = [...list, ...current];
      } else {
        list.push(current);
      }
      return list;
    }, []);
  };
}

export default FormsModel;
