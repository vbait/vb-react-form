import { cloneDeep } from 'lodash';

const privateModel = new WeakMap();

export default class FieldModelPublic {
  constructor(model) {
    privateModel.set(this, model);
    this.name = cloneDeep(model.name);
  }

  get value() {
    const model = privateModel.get(this);
    return cloneDeep(model.value);
  }

  get focused() {
    const model = privateModel.get(this);
    return cloneDeep(model.focused);
  }

  get touched() {
    const model = privateModel.get(this);
    return cloneDeep(model.touched);
  }

  get dirty() {
    const model = privateModel.get(this);
    return cloneDeep(model.dirty);
  }

  get submitted() {
    const model = privateModel.get(this);
    return cloneDeep(model.submitted);
  }

  setValue = (value) => {
    const model = privateModel.get(this);
    return model.setValue(value);
  };

  errors = () => {
    const model = privateModel.get(this);
    return model.getErrors();
  };

  isValid = () => {
    const model = privateModel.get(this);
    return model.isValid();
  };

  isExcluded = () => {
    const model = privateModel.get(this);
    return model.isExcluded();
  };

  validate = () => {
    const model = privateModel.get(this);
    return model.validate();
  };

  reload = () => {
    const model = privateModel.get(this);
    return model.reload();
  };
}
