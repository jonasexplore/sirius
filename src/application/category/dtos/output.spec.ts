import { Category } from '@/domain/category/entities/category';

import { CategoryOutputMapper } from './output';

describe('🔖 Category Output', () => {
  it('should convert a category in output', () => {
    const createdAt = new Date();
    const entity = new Category({
      name: 'category',
      description: 'description',
      isActive: true,
      createdAt,
    });

    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = CategoryOutputMapper.toOutput(entity);

    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'category',
      description: 'description',
      isActive: true,
      createdAt,
    });
  });
});
