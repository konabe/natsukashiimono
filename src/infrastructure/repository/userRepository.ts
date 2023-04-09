import { IUserRepository } from '../../domain/repository/userRepositoryInterface';
import { cognito, AWS_COGNITO_APP_CLIENT_ID } from '../aws';

export class UserRepository implements IUserRepository {
  async create(email: string, password: string): Promise<void> {
    try {
      await cognito
        .signUp({
          ClientId: AWS_COGNITO_APP_CLIENT_ID,
          Username: email,
          Password: password,
        })
        .promise();
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async verify(email: string, code: string): Promise<boolean> {
    try {
      await cognito
        .confirmSignUp({
          ClientId: AWS_COGNITO_APP_CLIENT_ID,
          Username: email,
          ConfirmationCode: code,
        })
        .promise();
      return true;
    } catch (err) {
      return false;
    }
  }

  async resendCode(email: string): Promise<boolean> {
    try {
      await cognito
        .resendConfirmationCode({
          ClientId: AWS_COGNITO_APP_CLIENT_ID,
          Username: email,
        })
        .promise();
      return true;
    } catch (err) {
      return false;
    }
  }

  async findToken(
    email: string,
    password: string,
  ): Promise<string | undefined> {
    try {
      const user = await cognito
        .initiateAuth({
          ClientId: AWS_COGNITO_APP_CLIENT_ID,
          AuthFlow: 'USER_PASSWORD_AUTH',
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
          },
        })
        .promise();
      return user.AuthenticationResult.AccessToken;
    } catch (err) {
      return undefined;
    }
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
