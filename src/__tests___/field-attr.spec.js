import {FieldAttr} from '../field-attr';
import {Validator} from '../index';

jest.useFakeTimers();

class ValidValidator extends Validator {}

class InvalidValidator extends Validator {
  isValid () {
    return false;
  }
}

const v3 = (errors) => {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        errors ? reject(errors) : resolve();
      }, 500);
    })
  }
};


describe('FieldAttr', () => {
  let fieldAttr;
  beforeEach(() => {
    fieldAttr = new FieldAttr({}, 'name', '', [], {}, null, {});
  });

  describe('initialization', () => {
    it('create', () => {
      expect(fieldAttr).toBe(fieldAttr);
    });

    it('setValue: should update value', () => {
      fieldAttr.setValue();
      expect(fieldAttr.value).toEqual('');
      fieldAttr.setValue('new-value');
      expect(fieldAttr.value).toEqual('new-value');
    });

    it('setValidators: should update validators', () => {
      fieldAttr.setValidators();
      expect(fieldAttr.validators).toEqual([]);
      fieldAttr.setValidators([1]);
      expect(fieldAttr.validators).toEqual([1]);
    });

    it('setValidatorsOptions: should update validatorsOptions', () => {
      fieldAttr.setValidatorsOptions();
      expect(fieldAttr.validatorsOptions).toEqual({});
      fieldAttr.setValidatorsOptions({test: 1});
      expect(fieldAttr.validatorsOptions).toEqual({test: 1});
    });

    it('setAsyncValidator: should update asyncValidator', () => {
      fieldAttr.setAsyncValidator();
      expect(fieldAttr.asyncValidator).not.toBeDefined();
      fieldAttr.setAsyncValidator({test: 1});
      expect(fieldAttr.asyncValidator).toEqual({test: 1});
    });

    it('setAsyncValidatorOptions: should update asyncValidatorOptions', () => {
      fieldAttr.setAsyncValidatorOptions();
      expect(fieldAttr.asyncValidatorOptions).toEqual({});
      fieldAttr.setAsyncValidatorOptions({test: 1});
      expect(fieldAttr.asyncValidatorOptions).toEqual({test: 1});
    });

    it('setErrors: should update errors', () => {
      fieldAttr.setErrors();
      expect(fieldAttr.errors).toEqual([]);
      fieldAttr.setErrors([1]);
      expect(fieldAttr.errors).toEqual([1]);
    });

    it('setDirty: should update dirty/pristine', () => {
      fieldAttr.setDirty();
      expect(fieldAttr.dirty).toEqual(false);
      expect(fieldAttr.pristine).toEqual(true);
      fieldAttr.setDirty(true);
      expect(fieldAttr.dirty).toEqual(true);
      expect(fieldAttr.pristine).toEqual(false);
    });

    it('setTouched: should update touched', () => {
      fieldAttr.setTouched();
      expect(fieldAttr.touched).toEqual(false);
      fieldAttr.setTouched(true);
      expect(fieldAttr.touched).toEqual(true);
    });

    it('setFocus: should update focused', () => {
      fieldAttr.setFocus();
      expect(fieldAttr.focused).toEqual(false);
      fieldAttr.setFocus(true);
      expect(fieldAttr.focused).toEqual(true);
    });
  });

  describe('validate', () => {
    const v1 = new ValidValidator();
    const v2 = new InvalidValidator();

    it('validate: should get empty errors list', () => {
      fieldAttr.validate();
      expect(fieldAttr.errors).toEqual([]);
      fieldAttr.setValidators([v1]);
      fieldAttr.validate();
      expect(fieldAttr.errors).toEqual([]);
    });

    it('validate: should get multi errors list', () => {
      fieldAttr.setValidators([v2, v2]);
      fieldAttr.validate();
      expect(fieldAttr.errors.length).toEqual(2);

      fieldAttr.setValidators([v1, v2]);
      fieldAttr.validate();
      expect(fieldAttr.errors.length).toEqual(1);
    });

    it('validate: should get single error in list', () => {
      fieldAttr.setValidators([v1, v2, v2]);
      fieldAttr.setValidatorsOptions({multi: false});
      fieldAttr.validate();
      expect(fieldAttr.errors.length).toEqual(1);
    });

    it('asyncValidate: should get empty errors list', (done) => {
      fieldAttr.setAsyncValidator(v3());
      fieldAttr.asyncValidate(null, () => {
        expect(fieldAttr.asyncErrors.length).toEqual(0);
        done();
      });
      jest.runAllTimers();
    });

    it('asyncValidate: should get errors list', (done) => {
      fieldAttr.setAsyncValidator(v3(['error']));
      fieldAttr.asyncValidate(null, () => {
        expect(fieldAttr.asyncErrors.length).toEqual(1);
        done();
      });
      jest.runAllTimers();
    });

    it('asyncValidate: should validate after static validators', (done) => {
      fieldAttr.setValidators([v2]);
      fieldAttr.setAsyncValidator(v3(['error']));
      fieldAttr.setAsyncValidatorOptions({validateAfterLocal : true});
      fieldAttr.validate();
      fieldAttr.asyncValidate(null, () => {
        expect(fieldAttr.asyncErrors.length).toEqual(0);
        done();
      });
    });

    it('asyncValidate: should pass validate with incorrect event', (done) => {
      fieldAttr.setAsyncValidator(v3(['error']));
      fieldAttr.setAsyncValidatorOptions({validateOn : [FieldAttr.events.CHANGE]});
      fieldAttr.asyncValidate(null, () => {
        expect(fieldAttr.asyncErrors.length).toEqual(0);
        done();
      });
    });

    it('asyncValidate: should validate with correct event', (done) => {
      fieldAttr.setAsyncValidator(v3(['error']));
      fieldAttr.setAsyncValidatorOptions({validateOn : [FieldAttr.events.CHANGE]});
      fieldAttr.asyncValidate(FieldAttr.events.CHANGE, () => {
        expect(fieldAttr.asyncErrors.length).toEqual(1);
        done();
      });
      jest.runAllTimers();
    });

    it('asyncValidate: shouldn\'t validate', (done) => {
      fieldAttr.setAsyncValidator();
      fieldAttr.asyncValidate(null, () => {
        expect(fieldAttr.asyncErrors.length).toEqual(0);
        done();
      });
    });
  });
});