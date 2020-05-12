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
});