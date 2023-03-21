import { Vote } from '../../../../domain/vote';
import { PostScoreRequest, PostScoreResponse } from '../score/postScoreAPI';

describe('PostScoreRequest', () => {
  describe('#instantiateBy', () => {
    test.each`
      contentId      | userId       | result
      ${'contentId'} | ${'userId'}  | ${true}
      ${'contentId'} | ${undefined} | ${false}
      ${undefined}   | ${'userId'}  | ${false}
    `(
      'should judge that object is valid (${result})',
      ({ contentId, userId, result }) => {
        expect(
          PostScoreRequest.instantiateBy({ contentId, userId }) !== undefined,
        ).toBe(result);
      },
    );
  });
});

describe('PostScoreResponse', () => {
  describe('#instantiateBy', () => {
    it('should create response', () => {
      expect(
        PostScoreResponse.instantiateBy([new Vote(1, 1), new Vote(2, 1)]),
      ).toEqual({
        contentId: 1,
        total: 2,
      });
    });

    it('should return undefined if id is undefined', () => {
      expect(PostScoreResponse.instantiateBy([])).toBeUndefined();
    });
  });
});
