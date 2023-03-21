import { getMockReq, getMockRes } from '@jest-mock/express';
import { UserAuthorizer } from './authorizer';
import { UserRepositoryMock } from '../../infrastructure/database/repository/userRepository.mock';

describe('authUser', () => {
  let { res, next, clearMockRes } = getMockRes();

  beforeEach(() => {
    clearMockRes();
  });

  it('should authorize admin', () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ADMINADMINADMIN'),
    });
    new UserAuthorizer({
      allowed: [],
      userRepository: new UserRepositoryMock(),
    }).authenticateUser(req, res, next);
    expect(res.send).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });

  it('should authorize user', () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ABCDEF1234567890'),
    });
    new UserAuthorizer({
      allowed: [],
      userRepository: new UserRepositoryMock(),
    }).authenticateUser(req, res, next);
    expect(res.send).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });

  it('should not authorize if value is incorrect', () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue(''),
    });
    new UserAuthorizer({
      allowed: [],
      userRepository: new UserRepositoryMock(),
    }).authenticateUser(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });

  it('should not authorize if header does not exist', () => {
    const req = getMockReq({});
    new UserAuthorizer({
      allowed: [],
      userRepository: new UserRepositoryMock(),
    }).authenticateUser(req, res, next);
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

  it('should authorize admin', () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ADMINADMINADMIN'),
    });
    new UserAuthorizer({
      allowed: [],
      userRepository: new UserRepositoryMock(),
    }).authenticateAdmin(req, res, next);
    expect(res.send).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });

  it('should NOT authorize user', () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue('Bearer ABCDEF1234567890'),
    });
    new UserAuthorizer({
      allowed: [],
      userRepository: new UserRepositoryMock(),
    }).authenticateAdmin(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });

  it('should not authorize if value is incorrect', () => {
    const req = getMockReq({
      header: jest.fn().mockReturnValue(''),
    });
    new UserAuthorizer({
      allowed: [],
      userRepository: new UserRepositoryMock(),
    }).authenticateAdmin(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });

  it('should not authorize if header does not exist', () => {
    const req = getMockReq({});
    new UserAuthorizer({
      allowed: [],
      userRepository: new UserRepositoryMock(),
    }).authenticateAdmin(req, res, next);
    expect(res.send).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(403);
    expect(next).toBeCalledTimes(0);
  });
});
