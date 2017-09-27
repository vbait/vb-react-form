import { cloneDeep } from 'lodash';

const privateModel = new WeakMap();

export default class FormModelPublic {
  constructor(model) {
    privateModel.set(this, model);
    this.id = cloneDeep(model.id);
    this.name = cloneDeep(model.name);
  }

  refresh = () => {
    const model = privateModel.get(this);
    return model.refresh();
  };

  reload = () => {
    const model = privateModel.get(this);
    return model.reload();
  };

  reset = () => {
    const model = privateModel.get(this);
    return model.reset();
  };

  init = (data = {}, makeDirty = false) => {
    const model = privateModel.get(this);
    return model.init(data, makeDirty)
  };

  makeDirty = () => {
    const model = privateModel.get(this);
    return model.makeDirty();
  };

  makeSubmitted = () => {
    const model = privateModel.get(this);
    return model.makeSubmitted();
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

  isSubmitted = () => {
    const model = privateModel.get(this);
    return model.isSubmitted();
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
