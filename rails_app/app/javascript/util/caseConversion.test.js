import * as caseConversion from './caseConversion';

describe('app/javascript/util/caseConversion', () => {
  describe('#toCamelCase', () => {
    it('handles regular strings', () => {
      const result = caseConversion.default.toCamelCase('word');
      expect(result).toEqual('word');
    });

    it('handles an arbitrary snake case', () => {
      const result = caseConversion.default.toCamelCase('this_is_snake_case');
      expect(result).toEqual('thisIsSnakeCase');
    });
  });

  describe('#toSnakeCase', () => {
    it('handles regular strings', () => {
      const result = caseConversion.default.toSnakeCase('word');
      expect(result).toEqual('word');
    });

    it('handles an arbitrary camel case', () => {
      const result = caseConversion.default.toSnakeCase('thisIsCamelCase');
      expect(result).toEqual('this_is_camel_case');
    });
  });
});