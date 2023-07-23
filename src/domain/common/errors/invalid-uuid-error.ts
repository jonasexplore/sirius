import { CommonErrors } from '.';

export class InvalidUuidError extends Error {
  constructor(uuid: string) {
    super(`Expected a valid uuid but received ${uuid}`);
    this.name = CommonErrors.InvalidUuidError;
  }
}
