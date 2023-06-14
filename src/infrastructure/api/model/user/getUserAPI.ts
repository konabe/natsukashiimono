import {
  BaseRequest,
  BaseResponse,
} from '../../../../controller/controllerAdaptor';
import { User } from '../../../../domain/user';

export class GetUserRequest extends BaseRequest {
  _getUserRequest!: never;
}

export class GetUserResponse extends BaseResponse {
  _getUserResponse!: never;
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
