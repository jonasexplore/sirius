import { validate } from 'uuid';

import { Entity } from './entity';
import { UniqueEntityId } from '../value-objects';

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe('🔖 Entity', () => {
  it('should set props and id', () => {
    const props = { prop1: 'prop1', prop2: 2 };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(validate(entity.id)).toBeTruthy();
  });

  it('should accept a valid uuid', () => {
    const props = { prop1: 'prop1', prop2: 2 };
    const id = new UniqueEntityId();
    const entity = new StubEntity(props, id);

    expect(entity.props).toStrictEqual(props);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toEqual(id.value);
  });

  it('should convert a entity to JSON', () => {
    const props = { prop1: 'prop1', prop2: 2 };
    const entity = new StubEntity(props);

    expect(entity.toJSON()).toStrictEqual({
      ...props,
      id: entity.id,
    });
  });
});
