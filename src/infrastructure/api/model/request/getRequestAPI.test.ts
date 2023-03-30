import { content1, contentNotHaveId } from '../../../../../data/content.data';
import { GetRequestResponse } from '../request/getRequestAPI';

describe('GetRequestResponse', () => {
  describe('#constructor', () => {
    it('should create response', () => {
      expect(new GetRequestResponse([content1, contentNotHaveId])).toEqual({
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
  });
});
