import { PostSignoutRequest, PostSignoutResponse } from './postSignoutAPI';

describe('PostSignoutRequest', () => {
  describe('#instantiateBy', () => {
    test.each`
      result
      ${true}
    `('should judge that object is valid (${result})', ({ result }) => {
      expect(PostSignoutRequest.instantiateBy({}) !== undefined).toBe(result);
    });
  });
});

describe('PostSignoutResponse', () => {
  describe('#instantiateBy', () => {
    it('should instantiate correctly', () => {
      expect(PostSignoutResponse.instantiateBy(true)).toBeDefined();
    });
  });
});
