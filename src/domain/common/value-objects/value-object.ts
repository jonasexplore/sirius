import { deepFreeze } from '../utils';

export abstract class ValueObject<T = unknown> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = deepFreeze(value);
  }

  get value(): T {
    return this._value;
  }

  toString = () => {
    if (typeof this.value !== 'object' || this.value === null) {
      try {
        return this.value.toString();
      } catch (e) {
        return this.value + '';
      }
    }

    const convertedValue = this.value.toString();
    return convertedValue === '[object Object]'
      ? JSON.stringify(this.value)
      : convertedValue;
  };
}
