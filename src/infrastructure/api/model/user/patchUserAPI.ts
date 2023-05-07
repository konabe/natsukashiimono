import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';
import { User } from '../../../../domain/user';

export class PatchUserRequest extends BaseRequest {
  private constructor(readonly age: number) {
    super();
  }

  static instantiateBy(object: any): PatchUserRequest | undefined {
    const { age } = object;
    if (age === undefined) {
      return undefined;
    }
    if (!(Number.isInteger(age) && age >= 0)) {
      return undefined;
    }
    return new PatchUserRequest(age);
  }
}

export class PatchUserResponse extends BaseResponse {
  readonly id: string;
  readonly roles: string[];
  readonly age: number | undefined;
  constructor(user: User) {
    super();
    this.id = user.id;
    this.roles = user.getRoleNames();
    this.age = user.age;
  }
}
