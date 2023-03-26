import { deepFreeze } from './object';

describe('🔖 object', () => {
  it('should be a immutable object', () => {
    const value = deepFreeze({
      value: 'value',
      nested: { value: 'value', date: new Date() },
    });

    expect(() => {
      value.value = 'new value';
    }).toThrowError(
      "Cannot assign to read only property 'value' of object '#<Object>'",
    );

    expect(() => {
      value.nested.value = 'new value';
    }).toThrowError(
      "Cannot assign to read only property 'value' of object '#<Object>'",
    );

    expect(value.nested.date).toBeInstanceOf(Date);
  });

  it('should not freeze a scalar value', () => {
    const variations = [
      { received: 'value', expected: 'string' },
      { received: true, expected: 'boolean' },
      { received: false, expected: 'boolean' },
      { received: 1, expected: 'number' },
    ];

    for (const variation of variations) {
      const value = deepFreeze(variation.received);

      expect(typeof value).toBe(variation.expected);
    }
  });
});
