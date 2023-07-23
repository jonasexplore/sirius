import { ValueObject } from '../value-object';

class StubValueObject extends ValueObject {}

describe('🔖 value object', () => {
  it('should create a value object', () => {
    const variations = ['value', { value: 'value' }];

    for (const variation of variations) {
      const valueObject = new StubValueObject(variation);

      expect(valueObject.value).toBe(variation);
    }
  });

  it('should return the value as a string', () => {
    const date = new Date();
    const variations = [
      { received: 'value', expected: 'value' },
      { received: '', expected: '' },
      { received: true, expected: 'true' },
      { received: false, expected: 'false' },
      { received: date, expected: date.toString() },
      {
        received: { value: 'value' },
        expected: JSON.stringify({ value: 'value' }),
      },
      { received: 5, expected: '5' },
    ];

    for (const variation of variations) {
      const valueObject = new StubValueObject(variation.received);

      expect(valueObject + '').toBe(variation.expected);
    }
  });

  it('should be a immutable object', () => {
    const valueObject = new StubValueObject({
      prop: 'value',
      nested: { value: 'value', date: new Date() },
    });

    expect(() => {
      (valueObject as any).value.prop = 'new value';
    }).toThrowError(
      "Cannot assign to read only property 'prop' of object '#<Object>'",
    );

    expect(() => {
      (valueObject as any).value.nested.value = 'new value';
    }).toThrowError(
      "Cannot assign to read only property 'value' of object '#<Object>'",
    );

    expect((valueObject as any).value.nested.date).toBeInstanceOf(Date);
  });
});
