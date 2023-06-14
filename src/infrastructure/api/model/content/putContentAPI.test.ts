import { content1, contentNotHaveId } from '../../../../../data/content.data';
import { PutContentRequest, PutContentResponse } from './putContentAPI';

const commonImageUrl = 'https://example.com/index.png';

describe('PutContentRequest', () => {
  describe('#instantiateBy & #createDomain', () => {
    test.each`
      name         | description  | imageUrl          | result
      ${'名前'}    | ${'説明'}    | ${commonImageUrl} | ${true}
      ${undefined} | ${'説明'}    | ${commonImageUrl} | ${false}
      ${'名前'}    | ${undefined} | ${commonImageUrl} | ${false}
      ${'名前'}    | ${'説明'}    | ${undefined}      | ${false}
    `(
      'should judge that object is valid (${result})',
      ({ name, description, imageUrl, result }) => {
        const request = PutContentRequest.instantiateBy({
          name,
          description,
          imageUrl,
        });
        expect(request !== undefined).toBe(result);
        expect(request?.createContent() !== undefined).toBe(result);
      },
    );
  });
});

describe('PutContentResponse', () => {
  describe('#instantiateBy', () => {
    it('should create response', () => {
      expect(PutContentResponse.instantiateBy(content1)).toEqual({
        id: 1,
        name: '懐かしいもの',
        description: '懐かしいという感情は時間が存在しなければないのだろうか',
        imageUrl: commonImageUrl,
        score: 2,
      });
    });

    it('should return undefined if id is undefined', () => {
      expect(
        PutContentResponse.instantiateBy(contentNotHaveId),
      ).toBeUndefined();
    });

    it('should return undefined if argument undefined', () => {
      expect(PutContentResponse.instantiateBy(undefined)).toBeUndefined();
    });
  });
});
