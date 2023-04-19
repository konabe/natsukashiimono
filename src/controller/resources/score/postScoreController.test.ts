import { getMockReq, getMockRes } from '@jest-mock/express';
import { IScoreRepository } from '../../../domain/repository/scoreRepositoryInterface';
import { PostScoreController } from './postScoreController';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { userRepositoryMock } from '../../../../data/repository.mocks';
import { User } from '../../../domain/user';
import { Role } from '../../../domain/role';

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
      ...userRepositoryMock,
      findUserIdByToken: jest.fn().mockResolvedValue('id001'),
      findUserById: jest
        .fn()
        .mockResolvedValue(
          User.instantiateBy('id001', [new Role('admin', 100)]),
        ),
    };
    postScoreController = new PostScoreController({
      userRepository,
      scoreRepository,
    });
    clearMockRes();
    res.locals.user = {};
  });

  it('should invoke normally', async () => {
    const req = getMockReq({
      method: 'POST',
      body: {
        contentId: 1,
      },
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
    res.locals.user = { id: 1 };
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
    const req = getMockReq({
      method: 'POST',
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
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
    const req = getMockReq({
      method: 'POST',
      body: {
        contentId: 1,
      },
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
    res.locals.user = { id: 1 };
    await postScoreController.invoke(req, res);
    expect(scoreRepository.save).toBeCalledTimes(1);
    expect(scoreRepository.find).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledTimes(1);
  });
});
