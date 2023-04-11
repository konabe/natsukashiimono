import { Vote } from '../../../../domain/vote';
import { PostScoreRequest, PostScoreResponse } from '../score/postScoreAPI';

describe('PostScoreRequest', () => {
  describe('#instantiateBy', () => {
    test.each`
      contentId      | result
      ${'contentId'} | ${true}
      ${undefined}   | ${false}
    `(
      'should judge that object is valid (${result})',
      ({ contentId, result }) => {
        expect(
          PostScoreRequest.instantiateBy({ contentId }) !== undefined,
        ).toBe(result);
      },
    );
  });
});

describe('PostScoreResponse', () => {
  describe('#instantiateBy', () => {
    it('should create response', () => {
      expect(
        PostScoreResponse.instantiateBy([new Vote(1, '1'), new Vote(1, '1')]),
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
