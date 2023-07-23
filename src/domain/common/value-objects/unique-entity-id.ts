import { v4 as uuid, validate as uuidValidate } from 'uuid';

import { ValueObject } from './value-object';
import { InvalidUuidError } from '../errors';

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuid());
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.value);

    if (!isValid) {
      throw new InvalidUuidError(this.value);
    }
  }
}
