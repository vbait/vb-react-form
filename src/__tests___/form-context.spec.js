import {FormContext} from '../form-context';
// import {Validator} from '../index';

jest.useFakeTimers();

describe('FormContext', () => {
  describe('Fields', () => {
    let context, fields, validators;
    beforeEach(() => {
      context = new FormContext();
      fields = context.fields;
      validators = context.validators;
    });

    it('should have initialize values', () => {
      expect(fields.subscribers).toEqual({});
      expect(fields.fields).toEqual({});
      expect(fields.lastId).toEqual(0);
    });
  });

  describe('Validators', () => {

  });
});
