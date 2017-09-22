import { cloneDeep } from 'lodash';

const privateModel = new WeakMap();

export default class FieldModelPublic {
  constructor(model) {
    privateModel.set(this, model);
    this.name = cloneDeep(model.name);
  }
}
