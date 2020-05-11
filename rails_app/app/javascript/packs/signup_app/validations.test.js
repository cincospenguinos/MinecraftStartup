import * as validationObj from './validations';

describe('app/javascript/packs/signup_app/validations', () => {
  const validations = validationObj.default;

  describe('name', () => {
    it('cannot be empty', () => {
      expect(validations.name('')).toEqual(['Name cannot be empty']);
    });

    it('accepts valid names', () => {
      expect(validations.name('Hello')).toEqual([]);
    });
  });
})