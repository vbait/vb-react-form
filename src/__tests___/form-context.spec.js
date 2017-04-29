import {FormContext} from '../form-context';
import {FieldAttr} from '../field-attr';
import {RequiredValidator} from '../validators';

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

    it('should add field', () => {
      const field = new FieldAttr({}, 'name');
      fields.updateField(field);
      expect(fields.fields['name']).toEqual(field);
    });

    it('should get fields', () => {
      const field = new FieldAttr({}, 'name');
      fields.updateField(field);
      expect(fields.getFields()).toEqual({[field.name]: field});
    });

    it('should get field by name', () => {
      const field = new FieldAttr({}, 'name');
      fields.updateField(field);
      expect(fields.getFieldByName(field.name)).toEqual(field);
    });

    it('should get field options by name', () => {
      const field = new FieldAttr({}, 'name');
      fields.updateField(field);
      expect(fields.getFieldOptions('wrong-name')).not.toBeDefined();
      expect(fields.getFieldOptions(field.name)).toEqual(field.getFieldOptions());
    });

    it('should get fields options', () => {
      const field = new FieldAttr({}, 'name');
      fields.updateField(field);
      expect(fields.getFieldsOptions()).toEqual({[field.name]: field.getFieldOptions()});
    });

    it('should get fields values', () => {
      const field = new FieldAttr({}, 'name');
      fields.updateField(field);
      expect(fields.getValues()).toEqual({[field.name]: field.value});
    });

    it('should get valid status', () => {
      const field = new FieldAttr({}, 'name');
      fields.updateField(field);
      expect(fields.isValid()).toEqual(true);
      // fields.updateField(field);
      // fields.setDirty();

      field.setValidators([new RequiredValidator()]);
      field.validate();
      fields.updateField(field);
      expect(fields.isValid()).toEqual(false);

      field.setValidators();
      field.validate();
      field.pending = true;
      fields.updateField(field);
      expect(fields.isValid()).toEqual(false);
    });

    it('should set fields as used', () => {
      const mockFn = jest.fn();
      const field = new FieldAttr({validate: mockFn}, 'name');
      fields.updateField(field);
      fields.updateFieldsAsUsed();
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('Validators', () => {

  });
});
