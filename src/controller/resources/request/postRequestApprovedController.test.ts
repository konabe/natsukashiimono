import { getMockRes } from '@jest-mock/express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { PostRequestApprovedController } from './postRequestApprovedController';
import { ApprovalStatus } from '../../../domain/approvalStatus';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import {
  contentRepositoryMock,
  userRepositoryMock,
} from '../../../../data/repository.mocks';
import { adminUser } from '../../../../data/user.data';
import { getPOSTMockReqWithToken } from '../../../../data/mockReq';

describe('postRequestApprovedController', () => {
  let postRequestApprovedController: PostRequestApprovedController;
  let userRepository: IUserRepository;
  let contentRepository: IContentRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    contentRepository = {
      ...contentRepositoryMock,
    };
    userRepository = {
      ...userRepositoryMock,
      findUserIdByToken: jest.fn().mockResolvedValue(adminUser.id),
      findUserById: jest.fn().mockResolvedValue(adminUser),
    };
    postRequestApprovedController = new PostRequestApprovedController({
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
    postRequestApprovedController = new PostRequestApprovedController({
      userRepository,
      contentRepository,
    });
    const req = getPOSTMockReqWithToken({
      contentId: 1,
    });
    await postRequestApprovedController.invoke(req, res);
    expect(contentRepository.updateApprovalStatus).toBeCalledTimes(1);
    expect(contentRepository.updateApprovalStatus).toBeCalledWith(
      1,
      ApprovalStatus.APPROVED,
    );
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({});
  });

  it('should return 400 when contentId is not found', async () => {
    contentRepository = {
      ...contentRepository,
      updateApprovalStatus: jest.fn().mockResolvedValue(1),
    };
    postRequestApprovedController = new PostRequestApprovedController({
      userRepository,
      contentRepository,
    });
    const req = getPOSTMockReqWithToken({});
    await postRequestApprovedController.invoke(req, res);
    expect(contentRepository.updateApprovalStatus).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledTimes(1);
  });

  it('should return 404 when content is not found', async () => {
    contentRepository = {
      ...contentRepository,
      updateApprovalStatus: jest.fn().mockResolvedValue(undefined),
    };
    postRequestApprovedController = new PostRequestApprovedController({
      userRepository,
      contentRepository,
    });
    const req = getPOSTMockReqWithToken({
      contentId: 1,
    });
    await postRequestApprovedController.invoke(req, res);
    expect(contentRepository.updateApprovalStatus).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledTimes(1);
  });
});
