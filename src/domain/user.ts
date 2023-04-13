import { Role } from './role';

export class User {
  private constructor(readonly id: string, readonly roles: Role[]) {}

  static instantiateBy(id: string, roles: Role[]): User {
    return new User(
      id,
      roles.sort((a, b) => a.precedence - b.precedence),
    );
  }

  getRepresentativeRoleName(): string {
    return this.roles[0].name;
  }

  getRoleNames(): string[] {
    return this.roles.map((r) => r.name);
  }
}
