import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';

export class UserRepositoryMock implements IUserRepository {
  findToken(email: string, password: string): string | undefined {
    if (email === 'user1@example.com' && password === 'pass') {
      return 'ABCDEF1234567890';
    }
    if (email === 'user2@example.com' && password === 'pass') {
      return '1234567890ABCDEF';
    }
    if (email === 'admin@example.com' && password === 'pass') {
      return 'ADMINADMINADMIN';
    }
  }
}
