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

  describe('password', () => {
    it('has to be at least eight characters long', () => {
      expect(validations.password('hey')).toContain('Passwords must be at least 8 characters long');
    });

    it('cannot be empty', () => {
      expect(validations.password('')).toContain('Passwords cannot be empty');
    });

    it('accepts a valid password', () => {
      expect(validations.password('12345678')).toEqual([]);
    })
  })
})