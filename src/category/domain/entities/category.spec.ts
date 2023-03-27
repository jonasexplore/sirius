import { Category } from './category';
import { UniqueEntityId } from '../../../common/domain/value-objects';

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

    category['name'] = 'new category';
    expect(category.name).toEqual('new category');

    category['description'] = 'category description';
    expect(category.description).toEqual('category description');

    category['isActive'] = false;
    expect(category.isActive).toEqual(false);
  });

  it('should create a valid uuid if not provided', () => {
    const uuid = new UniqueEntityId();
    const variations = [
      { props: { name: 'category' } },
      { props: { name: 'category' }, id: null },
      { props: { name: 'category' }, id: undefined },
      { props: { name: 'category' }, id: uuid },
    ];

    for (const variation of variations) {
      const category = new Category(variation.props, variation.id);

      expect(category.id).toBeDefined();
    }
  });

  it('should update category', () => {
    const category = new Category({ name: 'category' });

    category.update('new category', 'category description');

    expect(category.name).toEqual('new category');
    expect(category.description).toEqual('category description');
  });

  it('should activate or deactivate a category', () => {
    const category = new Category({ name: 'category' });

    category.deactivate();
    expect(category.isActive).toEqual(false);

    category.activate();
    expect(category.isActive).toEqual(true);
  });
});
