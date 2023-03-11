import { content2 } from '../../../../data/content.data';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { PostContentController } from './postContentController';

describe('PostContentController', () => {
  let postContentController: PostContentController;
  let contentRepository: IContentRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    contentRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn().mockResolvedValue(0),
    };
    postContentController = new PostContentController({
      contentRepository,
    });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    contentRepository = {
      find: jest.fn(),
      findOne: jest.fn().mockResolvedValue(content2),
      save: jest.fn().mockResolvedValue(2),
    };
    postContentController = new PostContentController({ contentRepository });
    const req = getMockReq({
      body: {
        name: '名前です',
        description: '説明です',
        imageUrl: 'https://example.com/index.png',
      },
    });
    await postContentController.invoke(req, res);
    expect(contentRepository.save).toBeCalledWith({
      name: '名前です',
      description: '説明です',
      imageUrl: 'https://example.com/index.png',
      votes: [],
    });
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      id: 2,
      name: '懐かしいもの',
      description: '懐かしいという感情は時間が存在しなければないのだろうか',
      imageUrl: 'https://example.com/index.png',
      score: 0,
    });
  });

  it('should notify 400 error when body is undefined', async () => {
    const req = getMockReq();
    await postContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  test.each`
    removedKey       | expected
    ${'name'}        | ${400}
    ${'imageUrl'}    | ${400}
    ${'description'} | ${400}
  `(
    'should notify 400 error when $removedKey is rack',
    async ({ removedKey, expected }) => {
      const preBody = {
        name: '懐かしいもの',
        description: '懐かしいという感情は時間が存在しなければないのだろうか',
        imageUrl: 'https://example.com/index.png',
      };
      delete preBody[removedKey];
      const req = getMockReq({ body: preBody });
      await postContentController.invoke(req, res);
      expect(res.status).toBeCalledWith(expected);
    },
  );
});
