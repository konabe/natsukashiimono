import { getMockReq, getMockRes } from '@jest-mock/express';
import { UserAuthorizer } from './authorizer';
import { UserRepositoryMock } from '../../infrastructure/repository/userRepository.mock';

describe('authUser', () => {
  let { res, next, clearMockRes } = getMockRes();

  beforeEach(() => {
    clearMockRes();
  });

  it('should authorize admin', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ADMINADMINADMIN'),
    });
    await new UserAuthorizer({
      allowed: ['user', 'admin'],
      userRepository: new UserRepositoryMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });

  it('should authorize user', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ABCDEF1234567890'),
    });
    await new UserAuthorizer({
      allowed: ['user', 'admin'],
      userRepository: new UserRepositoryMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });

  it('should not authorize if value is incorrect', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue(''),
    });
    await new UserAuthorizer({
      allowed: ['user', 'admin'],
      userRepository: new UserRepositoryMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });

  it('should not authorize if header does not exist', async () => {
    const req = getMockReq({});
    await new UserAuthorizer({
      allowed: ['user', 'admin'],
      userRepository: new UserRepositoryMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });
});

describe('authAdmin', () => {
  let { res, next, clearMockRes } = getMockRes();

  beforeEach(() => {
    clearMockRes();
  });

  it('should authorize admin', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ADMINADMINADMIN'),
    });
    await new UserAuthorizer({
      allowed: ['admin'],
      userRepository: new UserRepositoryMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });

  it('should NOT authorize user', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ABCDEF1234567890'),
    });
    await new UserAuthorizer({
      allowed: ['admin'],
      userRepository: new UserRepositoryMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });

  it('should not authorize if value is incorrect', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue(''),
    });
    await new UserAuthorizer({
      allowed: ['admin'],
      userRepository: new UserRepositoryMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });

  it('should not authorize if header does not exist', async () => {
    const req = getMockReq({});
    await new UserAuthorizer({
      allowed: ['admin'],
      userRepository: new UserRepositoryMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });
});
