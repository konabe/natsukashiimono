import { PostRequestDeclinedRequest } from './postRequestDeclinedAPI';

describe('PostRequestDeclinedRequest', () => {
  it('should create', () => {
    expect(
      PostRequestDeclinedRequest.instantiateBy({
        contentId: 1,
      }),
    ).toBeDefined();
  });

  it('should decline', () => {
    expect(
      PostRequestDeclinedRequest.instantiateBy({
        hoge: 'fuga',
      }),
    ).toBeUndefined();
  });
});
