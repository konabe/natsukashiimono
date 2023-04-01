import { content1 } from '../../../../data/content.data';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { GetRequestController } from '../request/getRequestController';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('getContentController', () => {
  let getRequestController: GetRequestController;
  let contentRepository: IContentRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    contentRepository = {
      find: jest.fn(),
      findApproved: jest.fn(),
      findInprogress: jest.fn().mockResolvedValue([content1]),
      findOne: jest.fn(),
      save: jest.fn(),
      updateApprovalStatus: jest.fn(),
    };
    getRequestController = new GetRequestController({ contentRepository });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getMockReq();
    await getRequestController.invoke(req, res);
    expect(contentRepository.findInprogress).toBeCalledTimes(1);
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
