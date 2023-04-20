import { BaseRequest } from '../../../../controller/controllerAdaptor';
import { User } from '../../../../domain/user';

export class GetUserRequest extends BaseRequest {}

export class GetUserResponse {
  readonly id: string;
  readonly roles: string[];
  readonly age: number | undefined;
  constructor(user: User) {
    this.id = user.id;
    this.roles = user.getRoleNames();
    this.age = user.age;
  }
}
