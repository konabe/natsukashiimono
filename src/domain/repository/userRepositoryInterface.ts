export interface IUserRepository {
  create(email: string): Promise<void>;
  findToken(email: string, password: string): Promise<string | undefined>;
  findUserByToken(token: string): Promise<string | undefined>;
  findRole(email: string): Promise<string | undefined>;
}
