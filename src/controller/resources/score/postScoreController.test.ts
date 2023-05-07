import { getMockRes } from '@jest-mock/express';
import { IScoreRepository } from '../../../domain/repository/scoreRepositoryInterface';
import { PostScoreController } from './postScoreController';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { userRepositoryAdminMock } from '../../../../data/repository.mocks';
import { getPOSTMockReqWithToken } from '../../../../data/mockReq';
import { PostScoreRequest } from '../../../infrastructure/api/model/score/postScoreAPI';

describe('PostScoreController', () => {
  let postScoreController: PostScoreController;
  let userRepository: IUserRepository;
  let scoreRepository: IScoreRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    scoreRepository = {
      save: jest.fn(),
      find: jest.fn().mockResolvedValue([
        { contentId: 1, userId: 1 },
        { contentId: 1, userId: 2 },
      ]),
    };
    userRepository = {
      ...userRepositoryAdminMock,
    };
    postScoreController = new PostScoreController({
      userRepository,
      scoreRepository,
    });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getPOSTMockReqWithToken({
      contentId: 1,
    });
    await postScoreController.invoke(req, res);
    expect(scoreRepository.save).toBeCalledTimes(1);
    expect(scoreRepository.find).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      contentId: 1,
      total: 2,
    });
  });

  it('should notify 400 error when body is undefined', async () => {
    const req = getPOSTMockReqWithToken({});
    await postScoreController.invoke(req, res);
    expect(scoreRepository.save).toBeCalledTimes(0);
    expect(scoreRepository.find).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledTimes(1);
  });

  it('should notify 500 error when result is empty', async () => {
    scoreRepository = {
      save: jest.fn(),
      find: jest.fn().mockResolvedValue([]),
    };
    postScoreController = new PostScoreController({
      userRepository,
      scoreRepository,
    });
    const req = getPOSTMockReqWithToken({
      contentId: 1,
    });
    await postScoreController.invoke(req, res);
    expect(scoreRepository.save).toBeCalledTimes(1);
    expect(scoreRepository.find).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledTimes(1);
  });
});
