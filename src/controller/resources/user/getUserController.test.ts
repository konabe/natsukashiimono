import { getMockReq, getMockRes } from '@jest-mock/express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { GetUserController } from './getUserController';
import { userRepositoryMock } from '../../../../data/repository.mocks';
import { User } from '../../../domain/user';
import { Role } from '../../../domain/role';

describe('GetUserController', () => {
  let getUserController: GetUserController;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryMock,
      findUserById: jest
        .fn()
        .mockResolvedValue(
          User.instantiateBy('user-id-1', [
            new Role('admin', 50),
            new Role('user', 100),
          ]),
        ),
      findUserIdByToken: jest.fn().mockResolvedValue('id001'),
    };
    getUserController = new GetUserController({ userRepository });
    clearMockRes();
    res.locals.user = {};
  });

  it('should return user', async () => {
    getUserController = new GetUserController({ userRepository });
    const req = getMockReq({
      method: 'GET',
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
    res.locals.user.id = 'user-id-1';
    await getUserController.invoke(req, res);
    expect(userRepository.findUserById).toBeCalledTimes(2);
    expect(userRepository.findUserById).toBeCalledWith('id001');
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      id: 'user-id-1',
      roles: ['admin', 'user'],
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
    res.locals.user.id = 'user-id-1';
    await getUserController.invoke(req, res);
    expect(userRepository.findUserById).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledTimes(1);
  });
});
