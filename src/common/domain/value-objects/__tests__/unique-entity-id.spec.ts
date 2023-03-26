import { validate } from 'uuid';

import { InvalidUuidError } from '../../../errors';
import { UniqueEntityId } from '../unique-entity-id';

describe('🔖 unique entity id', () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

  beforeEach(() => validateSpy.mockClear());

  it('should throw an error if the uuid is invalid', () => {
    const invalidUuid = 'invalid-uuid';

    const uuid = () => new UniqueEntityId(invalidUuid);

    expect(uuid).toThrowError(InvalidUuidError);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should create a valid uuid', () => {
    const uuid = '3e6602f5-3590-4728-9271-527ac1b23631';

    const ValueObject = new UniqueEntityId(uuid);

    expect(ValueObject.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should create a valid uuid with empty constructor', () => {
    const ValueObject = new UniqueEntityId();

    expect(validate(ValueObject.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
