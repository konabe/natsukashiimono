import { PostRequestApprovedRequest } from './postRequestApprovedAPI';

describe('PostRequestApprovedRequest', () => {
  it('should create', () => {
    expect(
      PostRequestApprovedRequest.instantiateBy({
        contentId: 1,
      }),
    ).toBeDefined();
  });

  it('should decline', () => {
    expect(
      PostRequestApprovedRequest.instantiateBy({
        hoge: 'fuga',
      }),
    ).toBeUndefined();
  });
});
