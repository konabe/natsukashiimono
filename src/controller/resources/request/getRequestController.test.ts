import { content1 } from '../../../../data/content.data';
import { getGETMockReqWithToken } from '../../../../data/mockReq';
import {
  contentRepositoryMock,
  userRepositoryAdminMock,
} from '../../../../data/repository.mocks';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { GetRequestController } from '../request/getRequestController';
import { getMockRes } from '@jest-mock/express';

describe('getContentController', () => {
  let getRequestController: GetRequestController;
  let userRepository: IUserRepository;
  let contentRepository: IContentRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    contentRepository = {
      ...contentRepositoryMock,
      findInprogress: jest.fn().mockResolvedValue([content1]),
    };
    userRepository = {
      ...userRepositoryAdminMock,
    };
    getRequestController = new GetRequestController({
      userRepository,
      contentRepository,
    });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getGETMockReqWithToken();
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
