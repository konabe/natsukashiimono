import { getMockReq, getMockRes } from '@jest-mock/express';
import { ControllerAdaptorStub } from '../../data/controllerAdaptorStub';
import { userRepositoryMock } from '../../data/repository.mocks';
import { IUserRepository } from '../domain/repository/userRepositoryInterface';
import { User } from '../domain/user';
import { Role } from '../domain/role';

describe('ControllerAdaptorStub', () => {
  let controller: ControllerAdaptorStub;
  let userRepository: IUserRepository;
  let { res, clearMockRes } = getMockRes();

  beforeEach(() => {
    userRepository = {
      ...userRepositoryMock,
    };
    controller = new ControllerAdaptorStub(userRepository);
    clearMockRes();
  });

  it('should return undefined if req has no Authorization header', async () => {
    const req = getMockReq();
    await controller.invoke(req, res);
    expect(res.status).toBeCalledWith(403);
  });

  it('should return undefined if req has no Authorization header', async () => {
    userRepository = {
      ...userRepositoryMock,
      findUserById: jest.fn().mockResolvedValue(undefined),
    };
    controller = new ControllerAdaptorStub(userRepository);
    const req = getMockReq({
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
    await controller.invoke(req, res);
    expect(res.status).toBeCalledWith(403);
  });

  it('should return undefined if req has no Authorization header', async () => {
    userRepository = {
      ...userRepositoryMock,
      findUserIdByToken: jest.fn().mockResolvedValue('user-id-1'),
      findUserById: jest
        .fn()
        .mockResolvedValue(
          User.instantiateBy('user-id-1', [
            new Role('admin', 50),
            new Role('user', 100),
          ]),
        ),
    };
    controller = new ControllerAdaptorStub(userRepository);
    const req = getMockReq({
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
    await controller.invoke(req, res);
    expect(res.status).toBeCalledWith(200);
  });

  it('should return undefined if req has no Authorization header', async () => {
    userRepository = {
      ...userRepositoryMock,
      findUserById: jest
        .fn()
        .mockResolvedValue(
          User.instantiateBy('user-id-1', [new Role('invalid', 0)]),
        ),
    };
    controller = new ControllerAdaptorStub(userRepository);
    const req = getMockReq({
      header: jest.fn().mockImplementation((name: string) => {
        if (name === 'Authorization') return 'hoge';
      }),
    });
    await controller.invoke(req, res);
    expect(res.status).toBeCalledWith(403);
  });
});
