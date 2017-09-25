import { FormItemModel } from './FormItemModel';

class FormsModel {
  constructor() {
    this.forms = {};
  }

  get = (name, defaultValue) => {
    return this.forms[name] || defaultValue;
  };

  add = ({ name, validator, excluded }, asList) => {
    const model = new FormItemModel(name, validator, excluded);
    if (asList) {
      if (!this.forms[name]) {
        this.forms[name] = [];
      }
      this.forms[name].push(model);
    } else {
      this.forms[name] = model;
    }
    return model;
  };

  remove = (model) => {
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
      return this.forms[key].addErrors(errors[key]);
    });
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

  makeSubmitted = () => {
    this.list().forEach(form => form.makeSubmitted());
  };

  isValid = () => {
    return this.list().every(form => form.isValid());
  };

  isTouched = () => {
    return this.list().some(form => form.isTouched());
  };

  data = () => {
    const values = {};
    Object.keys(this.forms).reduce((prev, key) => {
      if (Array.isArray(this.forms[key])) {
        prev[key] = this.forms[key].map(form => form.data());
        if (!prev[key].length) {
          delete prev[key];
        }
      } else  {
        prev[key] = this.forms[key].data();
      }
      return prev;
    }, values);
    return values;
  };

  values = () => {
    const values = {};
    Object.keys(this.forms).reduce((prev, key) => {
      if (Array.isArray(this.forms[key])) {
        prev[key] = this.forms[key].filter(form => !form.excluded).map(form => form.values());
        if (!prev[key].length) {
          delete prev[key];
        }
      } else if (!this.forms[key].excluded) {
        prev[key] = this.forms[key].values();
      }
      return prev;
    }, values);
    return values;
  };

  errors = () => {
    const errors = {};
    Object.keys(this.forms).forEach((key) => {
      if (Array.isArray(this.forms[key])) {
        errors[key] = [];
        return this.forms[key].forEach((form) => {
          errors[key].push(form.getErrors());
        });
      }
      errors[key] = this.forms[key].getErrors();
    });
    return errors;
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

  getPublic = () => {
    const forms = {};
    Object.keys(this.forms).forEach((key) => {
      if (Array.isArray(this.forms[key])) {
        forms[key] = [];
        return this.forms[key].forEach((form) => {
          forms[key].push(form.getPublic());
        });
      }
      forms[key] = this.forms[key].getPublic();
    });
    return forms;
  };
}

export default FormsModel;
