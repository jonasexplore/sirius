import { expect } from 'expect';

import { EntityValidationError } from '../errors/validation-error';
import { FieldsErrors } from '../validators';
import { ClassValidatorFields } from '../validators/class-validator-fields';

type Expected<T = any> =
  | {
      validator: ClassValidatorFields<T>;
      data: T;
    }
  | (() => T);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === 'function') {
      try {
        expected();
        return onError();
      } catch (e) {
        const exception = e as EntityValidationError;
        return assertContains(exception.error, received);
      }
    }

    const { validator, data } = expected;
    const isValid = validator.validate(data);

    if (isValid) {
      return onError();
    }

    return assertContains(validator.errors, received);
  },
});

const onError = () => ({
  pass: false,
  message: () => 'The data is valid',
});

const assertContains = (expected: FieldsErrors, received: FieldsErrors) => {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  const messageResponse = isMatch
    ? ''
    : `The validation errors not contains ${JSON.stringify(
        received,
      )}. Current: ${JSON.stringify(expected)}`;

  return {
    pass: isMatch,
    message: () => messageResponse,
  };
};
