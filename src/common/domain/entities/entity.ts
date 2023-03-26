import { UniqueEntityId } from '../value-objects';

export abstract class Entity<T> {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(public readonly props: T, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  get id() {
    return this.uniqueEntityId.value;
  }

  toJSON(): Required<{ id: string } & T> {
    return {
      ...this.props,
      id: this.id,
    } as Required<{ id: string } & T>;
  }
}
