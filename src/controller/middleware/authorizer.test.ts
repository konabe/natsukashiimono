import { getMockReq, getMockRes } from '@jest-mock/express';
import { UserAuthorizer } from './authorizer';
import { UserRepositoryStaticMock } from '../../../data/userRepositoryStatic.mock';

describe('authUser', () => {
  let { res, next, clearMockRes, mockClear } = getMockRes();

  beforeEach(() => {
    clearMockRes();
    res.locals = {};
  });

  it('should authorize admin', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ADMINADMINADMIN'),
    });
    await new UserAuthorizer({
      allowed: ['user', 'admin'],
      userRepository: new UserRepositoryStaticMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(0);
    expect(res.locals.user.id).toBe('admin@example.com');
    expect(res.locals.user.role).toBe('admin');
    expect(next).toBeCalledTimes(1);
  });

  it('should authorize user', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ABCDEF1234567890'),
    });
    await new UserAuthorizer({
      allowed: ['user', 'admin'],
      userRepository: new UserRepositoryStaticMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(0);
    expect(res.locals.user.id).toBe('user1@example.com');
    expect(res.locals.user.role).toBe('user');
    expect(next).toBeCalledTimes(1);
  });

  it('should not authorize if value is incorrect', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue(''),
    });
    await new UserAuthorizer({
      allowed: ['user', 'admin'],
      userRepository: new UserRepositoryStaticMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.locals.user).toBe(undefined);
    expect(res.locals.user).toBe(undefined);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });

  it('should not authorize if header does not exist', async () => {
    const req = getMockReq({});
    await new UserAuthorizer({
      allowed: ['user', 'admin'],
      userRepository: new UserRepositoryStaticMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.locals.user).toBe(undefined);
    expect(res.locals.user).toBe(undefined);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });
});

describe('authAdmin', () => {
  let { res, next, clearMockRes } = getMockRes();

  beforeEach(() => {
    clearMockRes();
    res.locals = {};
  });

  it('should authorize admin', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ADMINADMINADMIN'),
    });
    await new UserAuthorizer({
      allowed: ['admin'],
      userRepository: new UserRepositoryStaticMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(0);
    expect(res.locals.user.id).toBe('admin@example.com');
    expect(res.locals.user.role).toBe('admin');
    expect(next).toBeCalledTimes(1);
  });

  it('should NOT authorize user', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ABCDEF1234567890'),
    });
    await new UserAuthorizer({
      allowed: ['admin'],
      userRepository: new UserRepositoryStaticMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.locals.user).toBe(undefined);
    expect(res.locals.user).toBe(undefined);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });

  it('should not authorize if value is incorrect', async () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue(''),
    });
    await new UserAuthorizer({
      allowed: ['admin'],
      userRepository: new UserRepositoryStaticMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.locals.user).toBe(undefined);
    expect(res.locals.user).toBe(undefined);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });

  it('should not authorize if header does not exist', async () => {
    const req = getMockReq({});
    await new UserAuthorizer({
      allowed: ['admin'],
      userRepository: new UserRepositoryStaticMock(),
    }).authenticate(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.locals.user).toBe(undefined);
    expect(res.locals.user).toBe(undefined);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });
});
