import { content1 } from '../../../../data/content.data';
import { userRepositoryMock } from '../../../../data/repository.mocks';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { Role } from '../../../domain/role';
import { User } from '../../../domain/user';
import { GetRequestController } from '../request/getRequestController';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('getContentController', () => {
  let getRequestController: GetRequestController;
  let userRepository: IUserRepository;
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
    userRepository = {
      ...userRepositoryMock,
      findUserIdByToken: jest.fn().mockResolvedValue('id001'),
      findUserById: jest
        .fn()
        .mockResolvedValue(
          User.instantiateBy('id001', [new Role('admin', 100)]),
        ),
    };

    getRequestController = new GetRequestController({
      userRepository,
      contentRepository,
    });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getMockReq({
      method: 'GET',
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
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
