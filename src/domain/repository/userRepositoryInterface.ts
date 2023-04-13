import { User } from '../user';

export interface IUserRepository {
  create(email: string, password: string): Promise<boolean>;
  verify(email: string, code: string): Promise<boolean>;
  resendCode(email: string): Promise<boolean>;
  findToken(email: string, password: string): Promise<string | undefined>;
  findUserByToken(token: string): Promise<string | undefined>;
  findUserById(id: string): Promise<User | undefined>;
  findRole(email: string): Promise<string | undefined>;
  signout(userId: string): Promise<boolean>;
}
