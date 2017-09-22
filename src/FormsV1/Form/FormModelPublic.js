const privateModel = new WeakMap();

export default class FormModelPublic {
  constructor(model) {
    privateModel.set(this, model);
    this.id = model.id;
    this.name = model.name;
  }

  refresh = () => {
    const model = privateModel.get(this);
    return model.refresh();
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
    return model.getErrors();
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
