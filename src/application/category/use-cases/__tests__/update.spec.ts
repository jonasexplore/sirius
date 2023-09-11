import { Category } from '@/domain/category/entities/category';
import { NotFoundError } from '@/domain/common/errors/not-found';
import { CategoryInMemoryRepository } from '@/infra/category/repositories/in-memory';

import { UpdateCategoryUseCase } from '../update';

describe('🔖 Update Category Use Case', () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() =>
      useCase.execute({ id: 'fake id', name: 'fake' }),
    ).rejects.toThrow(new NotFoundError(`Entity not found using id: fake id`));
  });

  it('should update a category', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const entity = new Category({ name: 'Movie' });
    repository.items = [entity];

    let output = await useCase.execute({ id: entity.id, name: 'test' });
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'test',
      description: null,
      isActive: true,
      createdAt: entity.createdAt,
    });

    type Arrange = {
      input: {
        id: string;
        name: string;
        description?: null | string;
        isActive?: boolean;
      };
      expected: {
        id: string;
        name: string;
        description: null | string;
        isActive: boolean;
        createdAt: Date;
      };
    };
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.id,
          name: 'test',
          description: 'some description',
        },
        expected: {
          id: entity.id,
          name: 'test',
          description: 'some description',
          isActive: true,
          createdAt: entity.createdAt,
        },
      },
      {
        input: {
          id: entity.id,
          name: 'test',
        },
        expected: {
          id: entity.id,
          name: 'test',
          description: null,
          isActive: true,
          createdAt: entity.createdAt,
        },
      },
      {
        input: {
          id: entity.id,
          name: 'test',
          isActive: false,
        },
        expected: {
          id: entity.id,
          name: 'test',
          description: null,
          isActive: false,
          createdAt: entity.createdAt,
        },
      },
      {
        input: {
          id: entity.id,
          name: 'test',
        },
        expected: {
          id: entity.id,
          name: 'test',
          description: null,
          isActive: false,
          createdAt: entity.createdAt,
        },
      },
      {
        input: {
          id: entity.id,
          name: 'test',
          isActive: true,
        },
        expected: {
          id: entity.id,
          name: 'test',
          description: null,
          isActive: true,
          createdAt: entity.createdAt,
        },
      },
      {
        input: {
          id: entity.id,
          name: 'test',
          description: 'some description',
          isActive: false,
        },
        expected: {
          id: entity.id,
          name: 'test',
          description: 'some description',
          isActive: false,
          createdAt: entity.createdAt,
        },
      },
    ];

    for (const { input, expected } of arrange) {
      output = await useCase.execute({
        id: input.id,
        name: input.name,
        description: input.description,
        isActive: input.isActive,
      });
      expect(output).toStrictEqual({
        id: entity.id,
        name: expected.name,
        description: expected.description,
        isActive: expected.isActive,
        createdAt: expected.createdAt,
      });
    }
  });
});
