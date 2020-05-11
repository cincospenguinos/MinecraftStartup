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

  describe('email', () => {
    it('cannot be empty', () => {
      expect(validations.email('')).toContain('Email address cannot be empty');
    });

    it('does not accept an incorrect email address', () => {
      const email = 'this is not valid';
      expect(validations.email(email)).toContain('Email address must follow correct format');
    });
  });
})