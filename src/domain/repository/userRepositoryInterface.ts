export interface IUserRepository {
  findToken(email: string, password: string): string | undefined;
}
