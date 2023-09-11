export enum CommonErrors {
  InvalidUuidError = 'InvalidUuidError',
  NotFoundError = 'NotFoundError',
}

export { InvalidUuidError } from './invalid-uuid-error';
export { NotFoundError } from './not-found';
export { EntityValidationError, ValidationError } from './validation-error';
