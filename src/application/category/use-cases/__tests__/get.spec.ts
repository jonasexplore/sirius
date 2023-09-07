import { Category } from '@/domain/category/entities/category';
import { NotFoundError } from '@/domain/common/errors/not-found';
import { CategoryInMemoryRepository } from '@/infra/category/repositories/in-memory';

import { GetCategoryUseCase } from '../get';

describe('🔖 Get Category Use Case', () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  it('should throw error when entity not found', async () => {
    expect(() => useCase.execute({ id: 'id' })).rejects.toThrow(
      new NotFoundError(`Entity not found using id: id`),
    );
  });

  it('should returns a category', async () => {
    const categories = [
      new Category({ name: 'category1' }),
      new Category({ name: 'category2' }),
      new Category({ name: 'category3' }),
    ];

    repository.items = categories;
    const expectedCategory = categories[1];

    const spyFindById = jest.spyOn(repository, 'findById');
    const category = await useCase.execute({ id: expectedCategory.id });

    expect(spyFindById).toBeCalled();
    expect(category).toStrictEqual({
      id: expectedCategory.id,
      name: expectedCategory.name,
      description: expectedCategory.description,
      isActive: expectedCategory.isActive,
      createdAt: expectedCategory.createdAt,
    });
  });
});
