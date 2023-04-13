import { getMockReq, getMockRes } from '@jest-mock/express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { PostSignupController } from './postSignupController';
import { userRepositoryMock } from '../../../../data/repository.mocks';

describe('PostSignupController', () => {
  let postSignupController: PostSignupController;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryMock,
      create: jest.fn().mockResolvedValue(true),
    };
    postSignupController = new PostSignupController({ userRepository });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getMockReq({
      method: 'POST',
      body: {
        email: 'user1@example.com',
        password: 'password',
      },
    });
    await postSignupController.invoke(req, res);
    expect(userRepository.create).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ successed: true });
  });

  it('should notify 400 error if request is undefined', async () => {
    const req = getMockReq({
      method: 'POST',
    });
    await postSignupController.invoke(req, res);
    expect(userRepository.findToken).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledTimes(1);
  });
});
