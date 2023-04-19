import { Role } from './role';

export type UserOptionalAttributes = {
  age?: number;
};

export class User {
  private constructor(
    readonly id: string,
    readonly roles: Role[],
    readonly age: number | undefined,
  ) {}

  static instantiateBy(
    id: string,
    roles: Role[],
    options?: UserOptionalAttributes,
  ): User {
    return new User(
      id,
      roles.sort((a, b) => a.precedence - b.precedence),
      options?.age,
    );
  }

  getRepresentativeRoleName(): string {
    return this.roles[0].name;
  }

  getRoleNames(): string[] {
    return this.roles.map((r) => r.name);
  }
}
