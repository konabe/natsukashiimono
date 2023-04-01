import { getMockReq, getMockRes } from '@jest-mock/express';
import { IContentRepository } from '../../../domain/repository/contentRepositoryInterface';
import { PostRequestDeclinedController } from './postRequestDeclinedController';
import { ApprovalStatus } from '../../../domain/approvalStatus';

describe('PostRequestDeclinedController', () => {
  let postRequestDeclinedController: PostRequestDeclinedController;
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
    postRequestDeclinedController = new PostRequestDeclinedController({
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
      contentRepository,
    });
    const req = getMockReq({
      body: {
        contentId: 1,
      },
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
      contentRepository,
    });
    const req = getMockReq();
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
      contentRepository,
    });
    const req = getMockReq({
      body: {
        contentId: 1,
      },
    });
    await postRequestDeclinedController.invoke(req, res);
    expect(contentRepository.updateApprovalStatus).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledTimes(1);
  });
});
