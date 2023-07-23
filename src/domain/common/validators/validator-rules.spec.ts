import ValidatorRules from './validator-rules';
import ValidationError from '../errors/validation-error';

describe('🔖 validator rules', () => {
  it('values method', () => {
    const validator = ValidatorRules.values('some value', 'field');

    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('some value');
    expect(validator['property']).toBe('field');
  });

  it('required method', () => {
    const errorHandler = new ValidationError('The field is required');

    const variations = [
      { value: '', error: true },
      { value: null, error: true },
      { value: undefined, error: true },

      { value: 5, error: false },
      { value: false, error: false },
      { value: 'xpto', error: false },
      { value: 6.1231, error: false },
      { value: { name: 'Joe Due' }, error: false },
    ];

    for (const { error, value } of variations) {
      const expectHandler = () =>
        expect(() => ValidatorRules.values(value, 'field').required());

      if (error) {
        return expectHandler().toThrow(errorHandler);
      }

      expectHandler().not.toThrow(errorHandler);
    }
  });

  it('string method', () => {
    const errorHandler = new ValidationError('The field must be a string');

    const variations = [
      { value: '', error: false },
      { value: 'xpto', error: false },
      { value: null, error: false },
      { value: undefined, error: false },

      { value: 5, error: true },
      { value: false, error: true },
      { value: 6.1231, error: true },
      { value: { name: 'Joe Due' }, error: true },
    ];

    for (const { value, error } of variations) {
      const expectHandler = () =>
        expect(() => ValidatorRules.values(value, 'field').string());

      if (error) {
        return expectHandler().toThrow(errorHandler);
      }

      expectHandler().not.toThrow(errorHandler);
    }
  });

  it('maxLength method', () => {
    const variations = [
      { value: '', maxLength: 0, error: false },
      { value: 'xpto', maxLength: 4, error: false },
      { value: null, maxLength: 0, error: false },
      { value: undefined, maxLength: 0, error: false },

      { value: 'Joe Due', maxLength: 3, error: true },
      { value: 5, maxLength: 1, error: true },
      { value: null, maxLength: 1, error: true },
      { value: undefined, maxLength: 1, error: true },
      { value: false, maxLength: 1, error: true },
      { value: 6.1231, maxLength: 1, error: true },
      { value: { name: 'Joe Due' }, maxLength: 1, error: true },
    ];

    for (const { value, maxLength, error } of variations) {
      const errorHandler = new ValidationError(
        `The field must be less or equal than ${maxLength} characters`,
      );

      const expectHandler = () =>
        expect(() =>
          ValidatorRules.values(value, 'field').maxLength(maxLength),
        );

      if (error) {
        return expectHandler().toThrow();
      }

      expectHandler().not.toThrow(errorHandler);
    }
  });

  it('boolean method', () => {
    const errorHandler = new ValidationError('The field must be a boolean');

    const variations = [
      { value: false, error: false },
      { value: true, error: false },

      { value: '', error: true },
      { value: 'xpto', error: true },
      { value: 5, error: true },
      { value: 6.1231, error: true },
      { value: { name: 'Joe Due' }, error: true },
    ];

    for (const { value, error } of variations) {
      const expectHandler = () =>
        expect(() => ValidatorRules.values(value, 'field').boolean());

      if (error) {
        return expectHandler().toThrow(errorHandler);
      }

      expectHandler().not.toThrow(errorHandler);
    }
  });

  it('should throw a validation error when combine two or more validation rules', () => {
    let validator = ValidatorRules.values(null, 'field');
    expect(() => validator.required().string()).toThrow(
      'The field is required',
    );

    validator = ValidatorRules.values(1, 'field');
    expect(() => validator.required().string()).toThrow(
      'The field must be a string',
    );

    validator = ValidatorRules.values('Joe Due', 'field');
    expect(() => validator.required().string().maxLength(5)).toThrow(
      'The field must be less or equal than 5 characters',
    );
  });
});
