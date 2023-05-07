import { getMockRes } from '@jest-mock/express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { PostSignoutController } from './postSignoutController';
import { userRepositoryAdminMock } from '../../../../data/repository.mocks';
import { adminUser } from '../../../../data/user.data';
import { getPOSTMockReqWithToken } from '../../../../data/mockReq';

describe('PostSignoutController', () => {
  let postSignoutController: PostSignoutController;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryAdminMock,
      signout: jest.fn().mockResolvedValue(true),
    };
    postSignoutController = new PostSignoutController({ userRepository });
    clearMockRes();
  });

  it('should invoke normally', async () => {
    const req = getPOSTMockReqWithToken({});
    await postSignoutController.invoke(req, res);
    expect(userRepository.signout).toBeCalledTimes(1);
    expect(userRepository.signout).toBeCalledWith(adminUser.id);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      successed: true,
    });
  });
});
