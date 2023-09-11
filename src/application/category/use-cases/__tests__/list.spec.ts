import { Category } from '@/domain/category/entities/category';
import CategoryRepository from '@/domain/category/repositories/repository';
import { CategoryInMemoryRepository } from '@/infra/category/repositories/in-memory';

import { ListCategoryUseCase } from '../list';

describe('🔖 List Category Use Case', () => {
  let useCase: ListCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoryUseCase(repository);
  });

  test('toOutput method', () => {
    let result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    let output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = new Category({
      name: 'category',
    });
    result = new CategoryRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it('should returns output, with empty inputs, categories ordered by created_at', async () => {
    const createdAt = new Date();
    const items = [
      new Category({ name: 'category 1', createdAt }),
      new Category({
        name: 'category 2',
        createdAt: new Date(createdAt.getTime() + 100),
      }),
      new Category({
        name: 'category 3',
        createdAt: new Date(createdAt.getTime() + 200),
      }),
    ];

    repository.items = items;

    const output = await useCase.execute({});

    expect(output).toStrictEqual({
      items: [...items].map((entity) => entity.toJSON()),
      total: 3,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it('should returns output using pagination, sort and filter', async () => {
    const items = [
      new Category({ name: 'B' }),
      new Category({ name: 'AaA' }),
      new Category({ name: 'AAA' }),
      new Category({ name: 'Aaa' }),
      new Category({ name: 'A' }),
      new Category({ name: 'Z' }),
      new Category({ name: 'Y' }),
    ];

    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: 'A',
    });

    expect(output).toStrictEqual({
      items: [items[1], items[2]].map((entity) => entity.toJSON()),
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: 'name',
      filter: 'A',
    });

    expect(output).toStrictEqual({
      items: [items[3], items[4]].map((entity) => entity.toJSON()),
      total: 4,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });
  });
});
