import ValidationError from '../domain/errors/validation-error';

export default class ValidatorRules {
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  private isEmpty() {
    return [null, undefined].includes(this.value);
  }

  required(): Omit<this, 'required'> {
    if ([null, undefined, ''].includes(this.value)) {
      throw new ValidationError(`The ${this.property} is required`);
    }

    return this;
  }

  string(): Omit<this, 'string'> {
    if (!this.isEmpty() && typeof this.value !== 'string') {
      throw new ValidationError(`The ${this.property} must be a string`);
    }

    return this;
  }

  maxLength(max: number): Omit<this, 'maxLength'> {
    if (typeof this.value !== 'string') {
      throw new ValidationError(`The ${this.property} must be a string`);
    }

    if (!this.isEmpty() && this.value?.length > max) {
      throw new ValidationError(
        `The ${this.property} must be less or equal than ${max} characters`,
      );
    }

    return this;
  }

  boolean(): Omit<this, 'boolean'> {
    if (!this.isEmpty() && typeof this.value !== 'boolean') {
      throw new ValidationError(`The ${this.property} must be a boolean`);
    }

    return this;
  }
}

ValidatorRules.values('xpto', 'name').required().string().maxLength(10);
