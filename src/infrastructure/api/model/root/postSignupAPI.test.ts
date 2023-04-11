import { PostSignupRequest, PostSignupResponse } from './postSignupAPI';

describe('PostSignupRequest', () => {
  describe('#instantiateBy', () => {
    test.each`
      email                  | password      | result
      ${'user1@example.com'} | ${'password'} | ${true}
      ${'user1@example.com'} | ${undefined}  | ${false}
      ${undefined}           | ${'password'} | ${false}
    `(
      'should judge that object is valid (${result})',
      ({ email, password, result }) => {
        expect(
          PostSignupRequest.instantiateBy({ email, password }) !== undefined,
        ).toBe(result);
      },
    );
  });
});

describe('PostSignupResponse', () => {
  describe('#instantiateBy', () => {
    it('should instantiate correctly', () => {
      expect(PostSignupResponse.instantiateBy(true)).toBeDefined();
    });
  });
});
