import { getMockReq, getMockRes } from '@jest-mock/express';
import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import { PatchUserController } from './patchUserController';
import { userRepositoryMock } from '../../../../data/repository.mocks';
import { User } from '../../../domain/user';
import { Role } from '../../../domain/role';

describe('PatchUserController', () => {
  let patchUserController: PatchUserController;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryMock,
      findUserIdByToken: jest.fn().mockResolvedValue('id001'),
      findUserById: jest
        .fn()
        .mockResolvedValue(
          User.instantiateBy(
            'id001',
            [new Role('admin', 50), new Role('user', 100)],
            { age: 20 },
          ),
        ),
      updateAge: jest
        .fn()
        .mockResolvedValue(
          User.instantiateBy(
            'id001',
            [new Role('admin', 50), new Role('user', 100)],
            { age: 20 },
          ),
        ),
    };
    patchUserController = new PatchUserController({ userRepository });
    clearMockRes();
  });

  it('should return user', async () => {
    const req = getMockReq({
      method: 'PATCH',
      body: {
        age: 20,
      },
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
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
    const req = getMockReq({
      method: 'PATCH',
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
    await patchUserController.invoke(req, res);
    expect(userRepository.updateAge).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledTimes(1);
  });
});
