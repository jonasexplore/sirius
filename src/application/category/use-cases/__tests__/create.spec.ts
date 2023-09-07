import { CategoryInMemoryRepository } from '@/infra/category/repositories/in-memory';

import { CreateCategoryUseCase } from '../create';

describe('🔖 Create Category Use Case', () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  it('should create a category', async () => {
    const variants = [
      { name: 'test' },
      { name: 'test', description: 'description' },
      { name: 'test', description: 'description', isActive: false },
      { name: 'test', description: 'description', isActive: true },
      { name: 'test', isActive: true },
      { name: 'test', isActive: false },
    ];

    for (const [index, variant] of variants.entries()) {
      const spyInsert = jest.spyOn(repository, 'insert');

      const response = await useCase.execute(variant);

      const createdItem = repository.items[index];
      expect(spyInsert).toHaveBeenCalledTimes(index + 1);
      expect(response).toStrictEqual({
        id: createdItem.id,
        name: variant.name,
        description: variant?.description ?? null,
        isActive: variant?.isActive ?? false,
        createdAt: createdItem.createdAt,
      });
    }
  });
});
