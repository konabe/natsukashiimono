import { IUserRepository } from '../../domain/repository/userRepositoryInterface';

export class UserRepositoryMock implements IUserRepository {
  create(email: string): Promise<void> {
    return;
  }

  async verify(email: string, code: string): Promise<boolean> {
    return true;
  }

  async resendCode(email: string): Promise<boolean> {
    return true;
  }

  async findToken(
    email: string,
    password: string,
  ): Promise<string | undefined> {
    if (email === 'user1@example.com' && password === 'pass') {
      return 'ABCDEF1234567890';
    }
    if (email === 'user2@example.com' && password === 'pass') {
      return '1234567890ABCDEF';
    }
    if (email === 'admin@example.com' && password === 'pass') {
      return 'ADMINADMINADMIN';
    }
    return undefined;
  }

  async findUserByToken(token: string): Promise<string | undefined> {
    if (token === 'ABCDEF1234567890') {
      return 'user1@example.com';
    }
    if (token === '1234567890ABCDEF') {
      return 'user2@example.com';
    }
    if (token === 'ADMINADMINADMIN') {
      return 'admin@example.com';
    }
    return undefined;
  }

  async findRole(email: string): Promise<string | undefined> {
    if (email === 'user1@example.com') {
      return 'user';
    }
    if (email === 'user2@example.com') {
      return 'user';
    }
    if (email === 'admin@example.com') {
      return 'admin';
    }
    return undefined;
  }
}
