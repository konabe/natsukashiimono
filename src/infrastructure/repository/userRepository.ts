import { IUserRepository } from '../../domain/repository/userRepositoryInterface';
import { User } from '../../domain/user';
import {
  cognito,
  AWS_COGNITO_APP_CLIENT_ID,
  AWS_COGNITO_USER_POOL_ID,
} from '../aws';

export class UserRepository implements IUserRepository {
  private USER_GROUP_LIST_MAX = 10;

  async create(email: string, password: string): Promise<boolean> {
    try {
      const createdUser = await cognito
        .signUp({
          ClientId: AWS_COGNITO_APP_CLIENT_ID,
          Username: email,
          Password: password,
        })
        .promise();
      await cognito
        .adminAddUserToGroup({
          GroupName: 'user',
          UserPoolId: AWS_COGNITO_USER_POOL_ID,
          Username: createdUser.UserSub,
        })
        .promise();
      return true;
    } catch (err) {
      // TODO: ロールバックの構築でAtomicityを担保
      return false;
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
    try {
      const user = await cognito
        .getUser({
          AccessToken: token,
        })
        .promise();
      return user.Username;
    } catch (err) {
      return undefined;
    }
  }

  async findUserById(id: string): Promise<User | undefined> {
    try {
      const user = await cognito
        .adminGetUser({
          UserPoolId: AWS_COGNITO_USER_POOL_ID,
          Username: id,
        })
        .promise();
      const group = await cognito
        .adminListGroupsForUser({
          UserPoolId: AWS_COGNITO_USER_POOL_ID,
          Username: user.Username,
          Limit: this.USER_GROUP_LIST_MAX,
        })
        .promise();
      // 権限の強さ順にソートする
      const groups = group.Groups.sort(
        (a, b) => a.Precedence - b.Precedence,
      ).map((g) => g.GroupName);
      return new User(user.Username, groups);
    } catch (err) {
      return undefined;
    }
  }

  async findRole(email: string): Promise<string | undefined> {
    try {
      const group = await cognito
        .adminListGroupsForUser({
          UserPoolId: AWS_COGNITO_USER_POOL_ID,
          Username: email,
          Limit: this.USER_GROUP_LIST_MAX,
        })
        .promise();
      // 権限の強さ順にソートする
      const groups = group.Groups.sort((a, b) => a.Precedence - b.Precedence);
      const strengestGroup = groups[0]?.GroupName;
      return strengestGroup;
    } catch (err) {
      return undefined;
    }
  }

  async signout(userId: string): Promise<boolean> {
    try {
      await cognito
        .adminUserGlobalSignOut({
          UserPoolId: AWS_COGNITO_USER_POOL_ID,
          Username: userId,
        })
        .promise();
      return true;
    } catch (err) {
      return false;
    }
  }
}
