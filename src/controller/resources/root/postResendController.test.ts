import { getMockReq, getMockRes } from '@jest-mock/express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { PostResendController } from './postResendController';
import { userRepositoryMock } from '../../../../data/repository.mocks';
import { getPOSTMockReqWithToken } from '../../../../data/mockReq';

describe('PostResendController', () => {
  let postResendController: PostResendController;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryMock,
      resendCode: jest.fn().mockResolvedValue(true),
    };
    postResendController = new PostResendController({ userRepository });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getPOSTMockReqWithToken({
      email: 'user1@example.com',
    });
    await postResendController.invoke(req, res);
    expect(userRepository.resendCode).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      sent: true,
    });
  });

  it('should notify 400 error if request is undefined', async () => {
    const req = getPOSTMockReqWithToken({});
    await postResendController.invoke(req, res);
    expect(userRepository.findToken).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledTimes(1);
  });
});
