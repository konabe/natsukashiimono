import { getMockReq, getMockRes } from '@jest-mock/express';
import { IScoreRepository } from '../../../domain/scoreRepositoryInterface';
import { PostScoreController } from './postScoreController';

describe('PostScoreController', () => {
  let scoreRepository: IScoreRepository;
  let postScoreController: PostScoreController;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    scoreRepository = {
      save: jest.fn(),
      find: jest.fn().mockResolvedValue([
        { contentId: 1, userId: 1 },
        { contentId: 1, userId: 2 },
      ]),
    };
    postScoreController = new PostScoreController({
      scoreRepository,
    });
    clearMockRes();
  });

  it('should invoke without body', async () => {
    const req = getMockReq();
    await postScoreController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  it('should invoke without name', async () => {
    const req = getMockReq({
      body: {
        contentId: 1,
      },
    });
    await postScoreController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  it('should invoke without description', async () => {
    const req = getMockReq({
      body: {
        userId: 1,
      },
    });
    await postScoreController.invoke(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  it('should invoke normally', async () => {
    const req = getMockReq({
      body: {
        contentId: 1,
        userId: 1,
      },
    });
    await postScoreController.invoke(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      contentId: 1,
      total: 2,
    });
  });
});
