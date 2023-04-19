import { getMockReq, getMockRes } from '@jest-mock/express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { PostRequestDeclinedController } from './postRequestDeclinedController';
import { ApprovalStatus } from '../../../domain/approvalStatus';
import { userRepositoryMock } from '../../../../data/repository.mocks';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { User } from '../../../domain/user';
import { Role } from '../../../domain/role';

describe('PostRequestDeclinedController', () => {
  let postRequestDeclinedController: PostRequestDeclinedController;
  let userRepository: IUserRepository;
  let contentRepository: IContentRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    contentRepository = {
      find: jest.fn(),
      findApproved: jest.fn(),
      findInprogress: jest.fn(),
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
    postRequestDeclinedController = new PostRequestDeclinedController({
      userRepository,
      contentRepository,
    });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    contentRepository = {
      ...contentRepository,
      updateApprovalStatus: jest.fn().mockResolvedValue(1),
    };
    postRequestDeclinedController = new PostRequestDeclinedController({
      userRepository,
      contentRepository,
    });
    const req = getMockReq({
      method: 'POST',
      body: {
        contentId: 1,
      },
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
    await postRequestDeclinedController.invoke(req, res);
    expect(contentRepository.updateApprovalStatus).toBeCalledTimes(1);
    expect(contentRepository.updateApprovalStatus).toBeCalledWith(
      1,
      ApprovalStatus.DECLINED,
    );
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({});
  });

  it('should return 400 when contentId is not found', async () => {
    contentRepository = {
      ...contentRepository,
      updateApprovalStatus: jest.fn().mockResolvedValue(1),
    };
    postRequestDeclinedController = new PostRequestDeclinedController({
      userRepository,
      contentRepository,
    });
    const req = getMockReq({
      method: 'POST',
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
    await postRequestDeclinedController.invoke(req, res);
    expect(contentRepository.updateApprovalStatus).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledTimes(1);
  });

  it('should return 404 when content is not found', async () => {
    contentRepository = {
      ...contentRepository,
      updateApprovalStatus: jest.fn().mockResolvedValue(undefined),
    };
    postRequestDeclinedController = new PostRequestDeclinedController({
      userRepository,
      contentRepository,
    });
    const req = getMockReq({
      method: 'POST',
      body: {
        contentId: 1,
      },
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
    await postRequestDeclinedController.invoke(req, res);
    expect(contentRepository.updateApprovalStatus).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledTimes(1);
  });
});
