import { content1, contentNotHaveId } from '../../../../../data/content.data';
import { PostContentRequest, PostContentResponse } from './postContentAPI';

const commonImageUrl = 'https://example.com/index.png';

describe('PostContentRequest', () => {
  describe('#instantiateBy', () => {
    test.each`
      name         | description  | imageUrl          | result
      ${'名前'}    | ${'説明'}    | ${commonImageUrl} | ${true}
      ${undefined} | ${'説明'}    | ${commonImageUrl} | ${false}
      ${'名前'}    | ${undefined} | ${commonImageUrl} | ${false}
      ${'名前'}    | ${'説明'}    | ${undefined}      | ${false}
    `(
      'should judge that object is valid (${result})',
      ({ name, description, imageUrl, result }) => {
        expect(
          PostContentRequest.instantiateBy({ name, description, imageUrl }) !==
            undefined,
        ).toBe(result);
      },
    );
  });
});

describe('PostContentResponse', () => {
  describe('#instantiateBy', () => {
    it('should create response', () => {
      expect(PostContentResponse.instantiateBy(content1)).toEqual({
        id: 1,
        name: '懐かしいもの',
        description: '懐かしいという感情は時間が存在しなければないのだろうか',
        imageUrl: commonImageUrl,
        score: 2,
      });
    });

    it('should return undefined if id is undefined', () => {
      expect(
        PostContentResponse.instantiateBy(contentNotHaveId),
      ).toBeUndefined();
    });

    it('should return undefined if argument undefined', () => {
      expect(PostContentResponse.instantiateBy(undefined)).toBeUndefined();
    });
  });
});
