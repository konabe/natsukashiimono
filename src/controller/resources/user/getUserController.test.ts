import { getMockReq, getMockRes } from '@jest-mock/express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { GetUserController } from './getUserController';
import { userRepositoryAdminMock } from '../../../../data/repository.mocks';
import { adminUser } from '../../../../data/user.data';
import { getGETMockReqWithToken } from '../../../../data/mockReq';

describe('GetUserController', () => {
  let getUserController: GetUserController;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryAdminMock,
    };
    getUserController = new GetUserController({ userRepository });
    clearMockRes();
  });

  it('should return user', async () => {
    getUserController = new GetUserController({ userRepository });
    const req = getGETMockReqWithToken();
    await getUserController.invoke(req, res);
    expect(userRepository.findUserById).toBeCalledTimes(2);
    expect(userRepository.findUserById).toBeCalledWith(adminUser.id);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      id: adminUser.id,
      roles: adminUser.getRoleNames(),
    });
  });

  it('should return 403 if user is not found', async () => {
    userRepository = {
      ...userRepository,
      findUserById: jest.fn().mockResolvedValue(undefined),
    };
    getUserController = new GetUserController({ userRepository });
    const req = getMockReq({
      method: 'GET',
    });
    await getUserController.invoke(req, res);
    expect(userRepository.findUserById).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledTimes(1);
  });

  it('should return 404 if user is not found', async () => {
    userRepository = {
      ...userRepository,
      findUserById: jest
        .fn()
        .mockResolvedValueOnce(adminUser)
        .mockResolvedValue(undefined),
    };
    getUserController = new GetUserController({ userRepository });
    const req = getGETMockReqWithToken();
    await getUserController.invoke(req, res);
    expect(userRepository.findUserById).toBeCalledTimes(2);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledTimes(1);
  });
});
