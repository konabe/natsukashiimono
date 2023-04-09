import { getMockReq, getMockRes } from '@jest-mock/express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { PostSigninController } from './postSigninController';

describe('PostSigninController', () => {
  let postSigninController: PostSigninController;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findToken: jest.fn().mockReturnValue('token'),
      findRole: jest.fn(),
      findUserByToken: jest.fn(),
    };
    postSigninController = new PostSigninController({ userRepository });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getMockReq({
      body: {
        email: 'user1@example.com',
        password: 'password',
      },
    });
    await postSigninController.invoke(req, res);
    expect(userRepository.findToken).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
  });

  it('should notify 400 error if request is undefined', async () => {
    const req = getMockReq({});
    await postSigninController.invoke(req, res);
    expect(userRepository.findToken).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledTimes(1);
  });

  it('should notify 401 error if token is undefined', async () => {
    userRepository = {
      ...userRepository,
      findToken: jest.fn().mockReturnValue(undefined),
    };
    postSigninController = new PostSigninController({ userRepository });
    const req = getMockReq({
      body: {
        email: 'user1@example.com',
        password: 'password',
      },
    });
    await postSigninController.invoke(req, res);
    expect(userRepository.findToken).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledTimes(1);
  });
});
