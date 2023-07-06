import { Entity } from '../entities/entity';
import { UniqueEntityId } from '../value-objects';

export interface RepositoryInterface<T extends Entity> {
  insert(entity: T): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<T>;
  findAll(): Promise<T[]>;
  update(entity: T): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}
