import { getMockReq, getMockRes } from '@jest-mock/express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { GetUserController } from './getUserController';
import { userRepositoryMock } from '../../../../data/repository.mocks';
import { User } from '../../../domain/user';

describe('GetUserController', () => {
  let getUserController: GetUserController;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryMock,
      findUserById: jest
        .fn()
        .mockResolvedValue(new User('user-id-1', ['admin', 'user'])),
    };
    getUserController = new GetUserController({ userRepository });
    clearMockRes();
    res.locals.user = {};
  });

  it('should return user', async () => {
    getUserController = new GetUserController({ userRepository });
    const req = getMockReq({
      method: 'GET',
    });
    res.locals.user.id = 'user-id-1';
    await getUserController.invoke(req, res);
    expect(userRepository.findUserById).toBeCalledTimes(1);
    expect(userRepository.findUserById).toBeCalledWith('user-id-1');
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      id: 'user-id-1',
      roles: ['admin', 'user'],
    });
  });

  it('should return 404 if user is not found', async () => {
    userRepository = {
      ...userRepository,
      findUserById: jest.fn().mockResolvedValue(undefined),
    };
    getUserController = new GetUserController({ userRepository });
    const req = getMockReq({
      method: 'GET',
    });
    res.locals.user.id = 'user-id-1';
    await getUserController.invoke(req, res);
    expect(userRepository.findUserById).toBeCalledTimes(1);
    expect(userRepository.findUserById).toBeCalledWith('user-id-1');
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledTimes(1);
  });
});
