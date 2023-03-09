import { content1, content2 } from '../../../../data/content.data';
import { IContentFactory } from '../../../domain/contentFactoryInterface';
import { IContentRepository } from '../../../domain/contentRepositoryInterface';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { PostContentController } from './postContentController';

describe('PostContentController', () => {
  let contentFactory: IContentFactory;
  let contentRepository: IContentRepository;
  let postContentController: PostContentController;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    contentFactory = {
      create: jest.fn().mockResolvedValue([content1]),
      createOne: jest.fn().mockResolvedValue(content1),
    };
    contentRepository = {
      save: jest.fn().mockResolvedValue(0),
    };
    postContentController = new PostContentController({
      contentFactory,
      contentRepository,
    });
    clearMockRes();
  });

  it('should invoke without body', async () => {
    const req = getMockReq();
    await postContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  it('should invoke without name', async () => {
    const req = getMockReq({
      body: {
        description: '説明です',
        imageUrl: 'https://example.com/index.png',
      },
    });
    await postContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  it('should invoke without description', async () => {
    const req = getMockReq({
      body: {
        name: '名前です',
        imageUrl: 'https://example.com/index.png',
      },
    });
    await postContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  it('should invoke without imageUrl', async () => {
    const req = getMockReq({
      body: {
        name: '名前です',
        description: '説明です',
      },
    });
    await postContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  it('should invoke normally', async () => {
    postContentController = new PostContentController({
      contentFactory: {
        create: jest.fn(),
        createOne: jest.fn().mockResolvedValue(content2),
      },
      contentRepository: {
        save: jest.fn().mockResolvedValue(2),
      },
    });

    const req = getMockReq({
      body: {
        name: '名前です',
        description: '説明です',
        imageUrl: 'https://example.com/index.png',
      },
    });
    await postContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      id: 2,
      name: '懐かしいもの',
      description: '懐かしいという感情は時間が存在しなければないのだろうか',
      imageUrl: 'https://example.com/index.png',
      score: 0,
    });
  });
});
