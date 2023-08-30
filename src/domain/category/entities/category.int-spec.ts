import { Category } from './category';

describe('🔖 category - Integration Test', () => {
  describe('create method', () => {
    it('should a invalid category using name property', () => {
      expect(() => new Category({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => new Category({ name: '' })).containsErrorMessages({
        name: ['name should not be empty'],
      });

      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });
    });

    it('should a invalid category using description property', () => {
      expect(
        () => new Category({ name: 'name', description: 5 as any }),
      ).containsErrorMessages({
        description: ['description must be a string'],
      });
    });

    it('should a invalid category using isActive property', () => {
      expect(
        () =>
          new Category({
            name: 'name',
            description: 'description',
            isActive: '' as any,
          }),
      ).containsErrorMessages({
        isActive: ['isActive must be a boolean value'],
      });
    });
  });

  describe('update method', () => {
    it('should a invalid category using name property', () => {
      const category = new Category({
        name: 'name',
        description: 'description',
      });

      expect(() => category.update(null, null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => category.update('name', 5 as any)).containsErrorMessages({
        description: ['description must be a string'],
      });
    });
  });
});
