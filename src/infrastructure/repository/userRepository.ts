import { DataSource } from 'typeorm';
import { IUserRepository } from '../../domain/repository/userRepositoryInterface';
import { Role } from '../../domain/role';
import { User } from '../../domain/user';
import {
  cognito,
  AWS_COGNITO_APP_CLIENT_ID,
  AWS_COGNITO_USER_POOL_ID,
} from '../aws';
import { UserEntity } from '../database/entity/user.entity';

export class UserRepository implements IUserRepository {
  private USER_GROUP_LIST_MAX = 10;

  constructor(private readonly dataSource: DataSource) {}

  async create(email: string, password: string): Promise<boolean> {
    try {
      const createdUser = await cognito.signUp({
        ClientId: AWS_COGNITO_APP_CLIENT_ID,
        Username: email,
        Password: password,
      });
      await cognito.adminAddUserToGroup({
        GroupName: 'user',
        UserPoolId: AWS_COGNITO_USER_POOL_ID,
        Username: createdUser.UserSub,
      });
      return true;
    } catch (err) {
      // TODO: ロールバックの構築でAtomicityを担保
      return false;
    }
  }

  async verify(email: string, code: string): Promise<boolean> {
    try {
      await cognito.confirmSignUp({
        ClientId: AWS_COGNITO_APP_CLIENT_ID,
        Username: email,
        ConfirmationCode: code,
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  async resendCode(email: string): Promise<boolean> {
    try {
      await cognito.resendConfirmationCode({
        ClientId: AWS_COGNITO_APP_CLIENT_ID,
        Username: email,
      });
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
      const user = await cognito.initiateAuth({
        ClientId: AWS_COGNITO_APP_CLIENT_ID,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });
      return user.AuthenticationResult?.AccessToken;
    } catch (err) {
      return undefined;
    }
  }

  async findUserIdByToken(token: string): Promise<string | undefined> {
    try {
      const user = await cognito.getUser({
        AccessToken: token,
      });
      return user.Username;
    } catch (err) {
      return undefined;
    }
  }

  async findUserById(id: string): Promise<User | undefined> {
    return await this.getIntegratedUser(id);
  }

  async updateAge(id: string, age: number): Promise<User | undefined> {
    const userRepository = this.dataSource.getRepository(UserEntity);
    const userEntity = new UserEntity();
    userEntity.id = id;
    userEntity.age = age;
    await userRepository.save(userEntity);
    return await this.getIntegratedUser(id);
  }

  async signout(userId: string): Promise<boolean> {
    try {
      await cognito.adminUserGlobalSignOut({
        UserPoolId: AWS_COGNITO_USER_POOL_ID,
        Username: userId,
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  private async getIntegratedUser(id: string): Promise<User | undefined> {
    const userRepository = this.dataSource.getRepository(UserEntity);
    try {
      const user = await cognito.adminGetUser({
        UserPoolId: AWS_COGNITO_USER_POOL_ID,
        Username: id,
      });
      const group = await cognito.adminListGroupsForUser({
        UserPoolId: AWS_COGNITO_USER_POOL_ID,
        Username: user.Username,
        Limit: this.USER_GROUP_LIST_MAX,
      });
      const groups =
        group.Groups?.map((g) => {
          return new Role(g.GroupName ?? 'guest', g?.Precedence ?? 1000);
        }) ?? [];
      const userEntity = await userRepository.findOne({ where: { id } });
      const userId = user.Username;
      if (userId === undefined) {
        return undefined;
      }
      return User.instantiateBy(userId, groups, {
        age: userEntity?.age,
      });
    } catch (err) {
      return undefined;
    }
  }
}
