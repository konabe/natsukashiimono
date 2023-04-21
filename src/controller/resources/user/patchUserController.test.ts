import { getMockReq, getMockRes } from '@jest-mock/express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { PatchUserController } from './patchUserController';
import { userRepositoryMock } from '../../../../data/repository.mocks';
import { User } from '../../../domain/user';
import { Role } from '../../../domain/role';
import { getPATCHMockReqWithToken } from '../../../../data/mockReq';
import { adminUser, user20Years } from '../../../../data/user.data';

describe('PatchUserController', () => {
  let patchUserController: PatchUserController;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryMock,
      findUserIdByToken: jest.fn().mockResolvedValue('id001'),
      findUserById: jest.fn().mockResolvedValue(user20Years),
      updateAge: jest.fn().mockResolvedValue(user20Years),
    };
    patchUserController = new PatchUserController({ userRepository });
    clearMockRes();
  });

  it('should return user', async () => {
    const req = getPATCHMockReqWithToken({
      age: 20,
    });
    await patchUserController.invoke(req, res);
    expect(userRepository.findUserById).toBeCalledTimes(1);
    expect(userRepository.findUserById).toBeCalledWith('id001');
    expect(userRepository.updateAge).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      id: 'id001',
      roles: ['admin', 'user'],
      age: 20,
    });
  });

  it('should return 403 if user is not found', async () => {
    userRepository = {
      ...userRepository,
      findUserById: jest.fn().mockResolvedValue(undefined),
    };
    patchUserController = new PatchUserController({ userRepository });
    const req = getPATCHMockReqWithToken({
      age: 20,
    });
    await patchUserController.invoke(req, res);
    expect(userRepository.updateAge).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledTimes(1);
  });

  it('should return 404 if user is not found', async () => {
    userRepository = {
      ...userRepository,
      findUserById: jest.fn().mockResolvedValue(adminUser),
      updateAge: jest.fn().mockResolvedValue(undefined),
    };
    patchUserController = new PatchUserController({ userRepository });
    const req = getPATCHMockReqWithToken({
      age: 20,
    });
    await patchUserController.invoke(req, res);
    expect(userRepository.updateAge).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledTimes(1);
  });
});
