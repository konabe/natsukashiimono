export interface IUserRepository {
  create(email: string, password: string): Promise<void>;
  verify(email: string, code: string): Promise<boolean>;
  resendCode(email: string): Promise<boolean>;
  findToken(email: string, password: string): Promise<string | undefined>;
  findUserByToken(token: string): Promise<string | undefined>;
  findRole(email: string): Promise<string | undefined>;
}
