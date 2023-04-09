import { PostResendRequest, PostResendResponse } from './postResendAPI';

describe('PostResendRequest', () => {
  describe('#instantiateBy', () => {
    test.each`
      email                  | result
      ${'user1@example.com'} | ${true}
      ${undefined}           | ${false}
    `('should judge that object is valid (${result})', ({ email, result }) => {
      expect(PostResendRequest.instantiateBy({ email }) !== undefined).toBe(
        result,
      );
    });
  });
});

describe('PostResendResponse', () => {
  describe('#instantiateBy', () => {
    it('should instantiate correctly', () => {
      expect(PostResendResponse.instantiateBy(true)).toBeDefined();
    });
  });
});
