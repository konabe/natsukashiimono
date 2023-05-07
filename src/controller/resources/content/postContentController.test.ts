import { content2 } from '../../../../data/content.data';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { PostContentController } from './postContentController';
import { contentRepositoryMock } from '../../../../data/repository.mocks';

describe('PostContentController', () => {
  let postContentController: PostContentController;
  let contentRepository: IContentRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    contentRepository = {
      ...contentRepositoryMock,
      create: jest.fn().mockResolvedValue(0),
    };
    postContentController = new PostContentController({
      contentRepository,
    });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    contentRepository = {
      ...contentRepository,
      findOne: jest.fn().mockResolvedValue(content2),
      create: jest.fn().mockResolvedValue(2),
    };
    postContentController = new PostContentController({ contentRepository });
    const req = getMockReq({
      method: 'POST',
      body: {
        name: '名前です',
        description: '説明です',
        imageUrl: 'https://example.com/index.png',
      },
    });
    await postContentController.invoke(req, res);
    expect(contentRepository.create).toBeCalledWith({
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
    const req = getMockReq({
      method: 'POST',
    });
    await postContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledTimes(1);
  });

  it('should notify 400 error when body is not valid', async () => {
    const req = getMockReq({
      method: 'POST',
      body: {
        name: '',
        description: '',
        imageUrl: '',
      },
    });
    await postContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledTimes(1);
  });
});
