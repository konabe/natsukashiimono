import { IUserRepository } from '../src/domain/repository/userRepositoryInterface';

export const userRepositoryMock: IUserRepository = {
  create: jest.fn(),
  verify: jest.fn(),
  resendCode: jest.fn(),
  findToken: jest.fn(),
  findRole: jest.fn(),
  findUserIdByToken: jest.fn(),
  findUserById: jest.fn(),
  signout: jest.fn(),
};
