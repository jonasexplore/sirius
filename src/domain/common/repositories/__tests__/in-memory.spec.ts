import { Entity } from '../../entities/entity';
import { NotFoundError } from '../../errors/not-found';
import { UniqueEntityId } from '../../value-objects';
import { InMemoryRepository } from '../in-memory';

type StubEntityProps = {
  name: string;
  price: number;
};
class StubEntity extends Entity<StubEntityProps> {}
class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('🔖 In memory', () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it('should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'name', price: 1 });
    await repository.insert(entity);

    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  describe('findById', () => {
    it('should throw error when entity not found', async () => {
      expect(repository.findById('invalid id')).rejects.toThrow(
        new NotFoundError(`Entity not found using id: invalid id`),
      );
    });

    it('should throw error when entity not found with UniqueEntityId', async () => {
      const uuid = '3e6602f5-3590-4728-9271-527ac1b23631';
      expect(repository.findById(new UniqueEntityId(uuid))).rejects.toThrow(
        new NotFoundError(`Entity not found using id: ${uuid}`),
      );
    });

    it('should finds a entity by id', async () => {
      const entity = new StubEntity({ name: 'name', price: 1 });
      await repository.insert(entity);

      const response = await repository.findById(entity.id);

      expect(entity.toJSON()).toStrictEqual(response.toJSON());
    });

    it('should finds a entity by UniqueEntityId', async () => {
      const entity = new StubEntity({ name: 'name', price: 1 });
      await repository.insert(entity);

      const response = await repository.findById(new UniqueEntityId(entity.id));

      expect(entity.toJSON()).toStrictEqual(response.toJSON());
    });
  });

  describe('find', () => {
    it('should return a empty array', async () => {
      const response = await repository.findAll();

      expect(response.length).toBe(0);
    });

    it('should return all entities created', async () => {
      const data = [
        { name: 'name 1', price: 1 },
        { name: 'name 2', price: 2 },
        { name: 'name 3', price: 3 },
        { name: 'name 4', price: 4 },
      ];

      for (const item of data) {
        const entity = new StubEntity(item);
        await repository.insert(entity);
      }

      const response = await repository.findAll();
      expect(response.length).toBe(data.length);
    });
  });

  describe('update', () => {
    it('should throw an error when try update unexistent entity', async () => {
      const uuid = '3e6602f5-3590-4728-9271-527ac1b23631';
      expect(
        repository.update(
          new StubEntity(
            {
              name: 'name',
              price: 1,
            },
            new UniqueEntityId(uuid),
          ),
        ),
      ).rejects.toThrow(
        new NotFoundError(`Entity not found using id: ${uuid}`),
      );
    });

    it('should update an entity', async () => {
      const entity = new StubEntity({ name: 'name', price: 1 });
      await repository.insert(entity);

      const updatedEntity = new StubEntity(
        { name: 'updated', price: 0 },
        entity.uniqueEntityId,
      );
      await repository.update(updatedEntity);

      expect(updatedEntity.toJSON()).toStrictEqual(
        repository.items[0].toJSON(),
      );
    });
  });

  describe('delete', () => {
    it('should throw an error when try delete unexistent entity', async () => {
      const uuid = '3e6602f5-3590-4728-9271-527ac1b23631';
      expect(repository.delete(uuid)).rejects.toThrow(
        new NotFoundError(`Entity not found using id: ${uuid}`),
      );
    });

    it('should delete an entity with success', async () => {
      const uuid = '3e6602f5-3590-4728-9271-527ac1b23631';

      const entity = new StubEntity(
        { name: 'name', price: 1 },
        new UniqueEntityId(uuid),
      );

      await repository.insert(entity);
      const foundEntity = await repository.findById(uuid);

      expect(foundEntity.id).toBe(uuid);

      await repository.delete(uuid);
      const allEntities = await repository.findAll();

      expect(allEntities.length).toBe(0);
    });
  });
});
