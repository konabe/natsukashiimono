import { PostSigninRequest, PostSigninResponse } from '../root/postSigninAPI';

describe('PostSigninRequest', () => {
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
          PostSigninRequest.instantiateBy({ email, password }) !== undefined,
        ).toBe(result);
      },
    );
  });
});

describe('PostSinginResponse', () => {
  describe('#instantiateBy', () => {
    it('should instantiate correctly', () => {
      expect(PostSigninResponse.instantiateBy('token')).toBeDefined();
    });
  });
});
