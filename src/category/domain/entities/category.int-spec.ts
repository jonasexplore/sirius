import ValidationError from '../../../common/domain/errors/validation-error';
import { Category } from './category';

describe('🔖 category - Integration Test', () => {
  describe('create method', () => {
    it('should a invalid category using name property', () => {
      expect(() => new Category({ name: null })).toThrow(
        new ValidationError('The name is required'),
      );

      expect(() => new Category({ name: '' })).toThrow(
        new ValidationError('The name is required'),
      );

      expect(() => new Category({ name: 5 as any })).toThrow(
        new ValidationError('The name must be a string'),
      );
    });

    it('should a invalid category using description property', () => {
      expect(
        () => new Category({ name: 'name', description: 5 as any }),
      ).toThrow(new ValidationError('The description must be a string'));
    });

    it('should a invalid category using isActive property', () => {
      expect(
        () =>
          new Category({
            name: 'name',
            description: 'description',
            isActive: '' as any,
          }),
      ).toThrow(new ValidationError('The isActive must be a boolean'));
    });
  });

  describe('update method', () => {
    it('should a invalid category using name property', () => {
      const category = new Category({
        name: 'name',
        description: 'description',
      });

      expect(() => category.update(null, null)).toThrow(
        new ValidationError('The name is required'),
      );

      expect(() => category.update('name', 5 as any)).toThrow(
        new ValidationError('The description must be a string'),
      );
    });
  });
});
