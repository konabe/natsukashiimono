import { getMockReq, getMockRes } from '@jest-mock/express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { PostVerifyController } from './postVerifyController';
import { userRepositoryMock } from '../../../../data/repository.mocks';

describe('PostVerifyController', () => {
  let postVerifyController: PostVerifyController;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryMock,
      verify: jest.fn().mockResolvedValue(true),
    };
    postVerifyController = new PostVerifyController({ userRepository });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getMockReq({
      body: {
        email: 'user1@example.com',
        code: '123456',
      },
    });
    await postVerifyController.invoke(req, res);
    expect(userRepository.verify).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      verified: true,
    });
  });

  it('should notify 400 error if request is undefined', async () => {
    const req = getMockReq({});
    await postVerifyController.invoke(req, res);
    expect(userRepository.findToken).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledTimes(1);
  });
});
