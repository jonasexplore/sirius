import { Category } from './category';

describe('🔖 category', () => {
  it('should be defined', () => {
    expect(new Category({ name: 'category' })).toBeDefined();
  });

  it('should be created with default values', () => {
    const category = new Category({ name: 'category' });

    expect(category.props.createdAt).toBeInstanceOf(Date);
    delete category.props.createdAt;

    expect(category.props).toEqual({
      name: 'category',
      description: null,
      isActive: true,
    });
  });

  it('should be created with custom values', () => {
    const createdAt = new Date();
    const variations = [
      {
        name: 'category',
        description: 'category description',
        isActive: false,
        createdAt,
      },
      {
        name: 'category',
        description: 'category description',
      },
      {
        name: 'category',
        isActive: false,
      },
      {
        name: 'category',
        createdAt,
      },
    ];

    for (const variation of variations) {
      const category = new Category(variation);

      expect(category.props).toMatchObject(variation);
    }
  });

  it('should to work with getters and setters', () => {
    const category = new Category({ name: 'category' });

    expect(category.name).toEqual('category');
    expect(category.description).toEqual(null);
    expect(category.isActive).toEqual(true);
    expect(category.createdAt).toBeInstanceOf(Date);

    category['description'] = 'category description';
    expect(category.description).toEqual('category description');

    category['isActive'] = false;
    expect(category.isActive).toEqual(false);
  });
});
