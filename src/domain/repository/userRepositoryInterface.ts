import { User } from '../user';

export interface IUserRepository {
  create(email: string, password: string): Promise<boolean>;
  verify(email: string, code: string): Promise<boolean>;
  resendCode(email: string): Promise<boolean>;
  findToken(email: string, password: string): Promise<string | undefined>;
  findUserIdByToken(token: string): Promise<string | undefined>;
  findUserById(id: string): Promise<User | undefined>;
  signout(userId: string): Promise<boolean>;
}
