import { getMockReq, getMockRes } from '@jest-mock/express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { PostRequestApprovedController } from './postRequestApprovedController';
import { ApprovalStatus } from '../../../domain/approvalStatus';

describe('postRequestApprovedController', () => {
  let postRequestApprovedController: PostRequestApprovedController;
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
    postRequestApprovedController = new PostRequestApprovedController({
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
      contentRepository,
    });
    const req = getMockReq({
      body: {
        contentId: 1,
      },
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
      contentRepository,
    });
    const req = getMockReq();
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
      contentRepository,
    });
    const req = getMockReq({
      body: {
        contentId: 1,
      },
    });
    await postRequestApprovedController.invoke(req, res);
    expect(contentRepository.updateApprovalStatus).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledTimes(1);
  });
});
