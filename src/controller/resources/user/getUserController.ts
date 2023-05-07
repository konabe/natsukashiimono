import { IUserRepository } from '../../../domain/repository/userRepositoryInterface';
import {
  GetUserRequest,
  GetUserResponse,
} from '../../../infrastructure/api/model/user/getUserAPI';
import {
  ControllerAdaptor,
  StatusCode,
  ValidatedOptions,
} from '../../controllerAdaptor';

export class GetUserController extends ControllerAdaptor<
  GetUserRequest,
  GetUserResponse
> {
  protected readonly allowed = ['user', 'admin'];
  protected readonly userRepository: IUserRepository;

  constructor({ userRepository }: { userRepository: IUserRepository }) {
    super(userRepository);
  }

  createRequest(_: any): GetUserRequest {
    return new GetUserRequest();
  }

  async validated(_: GetUserRequest, options: ValidatedOptions): Promise<void> {
    const userId = options.authorizedUser?.id;
    // FIXME: userIdが必ずundefinedでないことを保証するControllerAdaptorを作成する
    if (userId === undefined) {
      this.returnWithError(StatusCode.Forbidden);
      return;
    }
    const user = await this.userRepository.findUserById(userId);
    if (user === undefined) {
      this.returnWithError(StatusCode.NotFound);
      return;
    }
    this.returnWithSuccess(new GetUserResponse(user));
    return;
  }
}
