import { Entity } from '../entities/entity';
import { NotFoundError } from '../errors/not-found';
import { UniqueEntityId } from '../value-objects';
import { RepositoryInterface } from './repository-contract';

export default abstract class InMemoryRepository<T extends Entity>
  implements RepositoryInterface<T>
{
  items: T[] = [];

  async insert(entity: T): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<T> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<T[]> {
    return this.items;
  }

  async update(entity: T): Promise<void> {
    await this._get(entity.id);

    const index = this.items.findIndex((item) => item.id === entity.id);

    this.items[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);

    const index = this.items.findIndex((item) => item.id === id);

    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<T> {
    const item: T = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundError(`Entity not found using id: ${id}`);
    }

    return item;
  }
}
