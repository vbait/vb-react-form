import { cloneDeep } from 'lodash';

const privateModel = new WeakMap();

export default class FormItemModelPublic {
  constructor(model) {
    privateModel.set(this, model);
    this.id = cloneDeep(model.id);
    this.name = cloneDeep(model.name);
  }

  reset = () => {
    const model = privateModel.get(this);
    return model.reset();
  };

  reload = () => {
    const model = privateModel.get(this);
    return model.reload();
  };

  init = (data = {}, makeDirty = false) => {
    const model = privateModel.get(this);
    return model.init(data, makeDirty)
  };

  makeDirty = () => {
    const model = privateModel.get(this);
    return model.makeDirty();
  };

  data = () => {
    const model = privateModel.get(this);
    return model.data();
  };

  values = () => {
    const model = privateModel.get(this);
    return model.values();
  };

  isValid = () => {
    const model = privateModel.get(this);
    return model.isValid();
  };

  isTouched = () => {
    const model = privateModel.get(this);
    return model.isTouched();
  };

  errors = () => {
    const model = privateModel.get(this);
    return cloneDeep(model.getErrors());
  };

  forms = () => {
    const model = privateModel.get(this);
    return model.forms.getPublic();
  };

  fields = () => {
    const model = privateModel.get(this);
    return model.fields.getPublic();
  };
}
