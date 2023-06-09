import { content1, contentNotHaveId } from '../../../../../data/content.data';
import { GetContentResponse } from '../content/getContentAPI';

describe('GetContentResponse', () => {
  describe('#instantiateBy', () => {
    it('should create response', () => {
      expect(new GetContentResponse([content1, contentNotHaveId])).toEqual({
        contents: [
          {
            id: 1,
            name: '懐かしいもの',
            description:
              '懐かしいという感情は時間が存在しなければないのだろうか',
            imageUrl: 'https://example.com/index.png',
            score: 2,
          },
        ],
      });
    });

    it('should return undefined if id is undefined', () => {
      expect(new GetContentResponse([])).toEqual({ contents: [] });
    });
  });
});
