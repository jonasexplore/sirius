import CategoryValidatorFactory, {
  CategoryRules,
  CategoryValidator,
} from './category';
import { CategoryProps } from '../entities/category';

describe('🔖 Category Validator', () => {
  let validator: CategoryValidator;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });

  test('invalidation cases for name field', () => {
    const variations = [
      {
        payload: null,
        expected: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      },
      {
        payload: { name: '' },
        expected: ['name should not be empty'],
      },
      {
        payload: { name: 5 },
        expected: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      },
      {
        payload: { name: 't'.repeat(256) },
        expected: ['name must be shorter than or equal to 255 characters'],
      },
    ];

    for (const { payload, expected } of variations) {
      expect({ validator, data: payload }).containsErrorMessages({
        name: expected,
      });
    }
  });

  test('invalidation cases for description field', () => {
    expect({ validator, data: { description: 5 } }).containsErrorMessages({
      description: ['description must be a string'],
    });
  });

  test('invalidation cases for isActive field', () => {
    expect({ validator, data: { isActive: 5 } }).containsErrorMessages({
      isActive: ['isActive must be a boolean value'],
    });

    expect({ validator, data: { isActive: 0 } }).containsErrorMessages({
      isActive: ['isActive must be a boolean value'],
    });

    expect({ validator, data: { isActive: 1 } }).containsErrorMessages({
      isActive: ['isActive must be a boolean value'],
    });
  });

  test('valid cases for fields', () => {
    const variations = [
      { name: 'some value' },
      { name: 'some value', description: undefined },
      { name: 'some value', description: null },
      { name: 'some value', isActive: true },
      { name: 'some value', isActive: false },
    ];

    for (const variant of variations) {
      const isValid = validator.validate(variant as CategoryProps);

      expect(isValid).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new CategoryRules(variant));
    }
  });
});
