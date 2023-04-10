import { PostVerifyRequest, PostVerifyResponse } from './postVerifyAPI';

describe('PostVerifyRequest', () => {
  describe('#instantiateBy', () => {
    test.each`
      email                  | code        | result
      ${'user1@example.com'} | ${'123456'} | ${true}
    `(
      'should judge that object is valid (${result})',
      ({ email, code, result }) => {
        expect(
          PostVerifyRequest.instantiateBy({ email, code }) !== undefined,
        ).toBe(result);
      },
    );
  });
});

describe('PostVerifyResponse', () => {
  describe('#instantiateBy', () => {
    it('should instantiate correctly', () => {
      expect(PostVerifyResponse.instantiateBy(true)).toBeDefined();
    });
  });
});
