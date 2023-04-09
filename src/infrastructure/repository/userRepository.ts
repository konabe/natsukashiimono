import { IUserRepository } from '../../domain/repository/userRepositoryInterface';
import { cognito, COGNITO_USER_POOL_ID } from '../aws';

export class UserRepository implements IUserRepository {
  async create(email: string): Promise<void> {
    const user = await cognito
      .adminCreateUser({
        UserPoolId: COGNITO_USER_POOL_ID,
        Username: email,
      })
      .promise()
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
    return;
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
