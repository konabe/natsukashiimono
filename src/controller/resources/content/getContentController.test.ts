import { content1 } from '../../../../data/content.data';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { GetContentController } from './getContentController';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('getContentController', () => {
  let getContentController: GetContentController;
  let contentRepository: IContentRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    contentRepository = {
      find: jest.fn().mockResolvedValue([content1]),
      findOne: jest.fn(),
      save: jest.fn(),
    };
    getContentController = new GetContentController({ contentRepository });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getMockReq();
    await getContentController.invoke(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith([
      {
        id: 1,
        name: '懐かしいもの',
        description: '懐かしいという感情は時間が存在しなければないのだろうか',
        imageUrl: 'https://example.com/index.png',
        score: 2,
      },
    ]);
  });
});
