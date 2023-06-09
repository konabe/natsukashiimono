import { content1 } from '../../../../data/content.data';
import { contentRepositoryMock } from '../../../../data/repository.mocks';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { GetContentController } from './getContentController';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('getContentController', () => {
  let getContentController: GetContentController;
  let contentRepository: IContentRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    contentRepository = {
      ...contentRepositoryMock,
      findApproved: jest.fn().mockResolvedValue([content1]),
    };
    getContentController = new GetContentController({ contentRepository });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getMockReq({
      method: 'GET',
    });
    await getContentController.invoke(req, res);
    expect(contentRepository.findApproved).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      contents: [
        {
          id: 1,
          name: '懐かしいもの',
          description: '懐かしいという感情は時間が存在しなければないのだろうか',
          imageUrl: 'https://example.com/index.png',
          score: 2,
        },
      ],
    });
  });
});
