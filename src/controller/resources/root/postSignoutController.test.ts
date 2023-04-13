import { getMockReq, getMockRes } from '@jest-mock/express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { PostSignoutController } from './postSignoutController';
import { userRepositoryMock } from '../../../../data/repository.mocks';

describe('PostSignoutController', () => {
  let postSignoutController: PostSignoutController;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryMock,
      signout: jest.fn().mockResolvedValue(true),
    };
    postSignoutController = new PostSignoutController({ userRepository });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getMockReq({
      method: 'POST',
    });
    res.locals.user = {
      id: 'userId',
      role: 'userRole',
    };
    await postSignoutController.invoke(req, res);
    expect(userRepository.signout).toBeCalledTimes(1);
    expect(userRepository.signout).toBeCalledWith('userId');
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      successed: true,
    });
  });
});
