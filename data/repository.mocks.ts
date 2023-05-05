import { IContentRepository } from '../src/domain/repository/contentRepositoryInterface';
import { IUserRepository } from '../src/domain/repository/userRepositoryInterface';

export const userRepositoryMock: IUserRepository = {
  create: jest.fn(),
  verify: jest.fn(),
  resendCode: jest.fn(),
  findToken: jest.fn(),
  findUserIdByToken: jest.fn(),
  findUserById: jest.fn(),
  updateAge: jest.fn(),
  signout: jest.fn(),
};

export const contentRepositoryMock: IContentRepository = {
  find: jest.fn(),
  findApproved: jest.fn(),
  findInprogress: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  updateApprovalStatus: jest.fn(),
};
