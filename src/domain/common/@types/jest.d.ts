import { FieldsErrors } from '../validators';

declare global {
  namespace jest {
    interface Matchers<R> {
      containsErrorMessages: (expected: FieldsErrors) => R;
    }
  }
}
